package com.example.backend.service.impl;

import com.cloudinary.Cloudinary;
import com.example.backend.common.configure.CloudinaryConfig;
import com.example.backend.common.exception.TechnicalException;
import com.example.backend.common.model.AccountStatus;
import com.example.backend.common.utils.CodeGeneratorUtils;
import com.example.backend.common.utils.EmailUtils;
import com.example.backend.common.utils.JwtTokenUtil;
import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.mapper.UserMapper;
import com.example.backend.model.dto.AuthenticationDto;
import com.example.backend.model.dto.JsonWebToken;
import com.example.backend.model.dto.UserDto;
import com.example.backend.model.entity.UserEntity;
import com.example.backend.model.request.AuthRequest;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final EmailUtils emailUtils;
    //    private final RedisTemplate<String, Object> cache;
    private final UserMapper userMapper;
    private final Map<String, AuthRequest> cacheAuth = new HashMap<>();
    @Value("${spring.cloudinary.url}")
    private String cloudinary_url;

    // done
    @Override
    public AuthenticationDto loginSocial(AuthRequest authRequest) {
        AuthenticationDto authenticationDto;
        Optional<UserEntity> optionUserEntity = userRepository.findAccountEntityByEmail(authRequest.getEmail());
        if (optionUserEntity.isEmpty()) {
            String otp = CodeGeneratorUtils.invoke();
            authRequest.setOtp(otp);
            cacheAuth.put(authRequest.getEmail(), authRequest);
            authenticationDto = AuthenticationDto.builder().email(authRequest.getEmail()).accountStatus(AccountStatus.NEW_USER).build();
            emailUtils.sendEmailInviteToRoom(otp, authRequest.getEmail(), "REGISTER");
        } else {
            UserEntity userEntity = optionUserEntity.get();
            String at = jwtTokenUtil.generateToken(optionUserEntity.get().getEmail(), JwtTokenUtil.JWT_ACCESS_TOKEN_VALIDITY);
            String rt = jwtTokenUtil.generateToken(optionUserEntity.get().getEmail(), JwtTokenUtil.JWT_REFRESH_TOKEN_VALIDITY);
            UserDto user = userMapper.entityToDto(userEntity);
            authenticationDto = AuthenticationDto.builder().accountStatus(AccountStatus.OLD_USER).userDto(user).jsonWebToken(new JsonWebToken(at, rt)).build();
        }
        return authenticationDto;
    }

//    private AuthRequest convertOAuthToAccount(Map<String, Object> data) {
//        return AuthRequest.builder().userName(String.valueOf(data.get("name"))).email((String) data.get("email")).imageURL((String) data.get("picture")).build();
//    }

    @Override
    public UserEntity update(UserDto userDto) {
        UserEntity userEntity = userRepository.findAccountEntityByEmail(userDto.getEmail()).orElseThrow(() -> {
            throw new ResourceNotFoundException("account not exist");
        });
        Cloudinary cloudinary = CloudinaryConfig.getInstance();
        try {
            Map cloudinary_response = cloudinary.uploader().upload(userDto.getImageFile().getBytes(), CloudinaryConfig.options(userDto.getImageFile().getOriginalFilename()));
            userEntity.setImageURL(cloudinary_response.get("url").toString());
            userEntity.setUserName(userDto.getUserName());
            return userRepository.save(userEntity);
        } catch (IOException e) {
            throw new TechnicalException(e.getMessage());
        }
    }

    @Override
    public AuthenticationDto register(AuthRequest authRequest) {
        Optional<UserEntity> accountEntity = userRepository.findAccountEntityByEmail(authRequest.getEmail());
        if (accountEntity.isPresent())
            throw new ResourceInvalidException("email " + authRequest.getEmail() + " exists");
        else {
            String otp = CodeGeneratorUtils.invoke();
            authRequest.setOtp(otp);
            cacheAuth.put(authRequest.getEmail(), authRequest);
            emailUtils.sendEmailInviteToRoom("your otp is: " + otp, authRequest.getEmail(), "REGISTER");
            return AuthenticationDto.builder().email(authRequest.getEmail()).accountStatus(AccountStatus.NEW_USER).build();
        }
    }

    @Override
    public Boolean validateRegisterAccount(AuthRequest authRequest) {
        Optional<UserEntity> checking = userRepository.findAccountEntityByEmail(authRequest.getEmail());
        if (checking.isPresent()) throw new ResourceInvalidException("account is exists");
        if (!cacheAuth.containsKey(authRequest.getEmail())) {
            throw new ResourceInvalidException("account or otp in valid");
        }
        AuthRequest userDto = cacheAuth.get(authRequest.getEmail());
        String otp = authRequest.getOtp();
        if (!Objects.equals(otp, authRequest.getOtp())) throw new ResourceInvalidException("otp invalid");
        else {
            UserEntity userEntity = new UserEntity();
            userEntity.setEmail(userDto.getEmail());
            userEntity.setPassword(userDto.getPassword());
            userEntity.setUserName(userDto.getUserName());
            userEntity.setImageURL(authRequest.getImageURL());
            userRepository.save(userEntity);
            cacheAuth.remove(authRequest.getEmail());
            return true;
        }
    }

    @Override
    public AuthenticationDto loginTraditional(UserDto userDto) {
        UserEntity userEntity = userRepository.findAccountEntityByEmailAndPassword(userDto.getEmail(), userDto.getPassword()).orElseThrow(() -> {
            throw new ResourceNotFoundException("email or password invalid");
        });
        String accessToken = jwtTokenUtil.generateToken(userDto.getEmail(), JwtTokenUtil.JWT_ACCESS_TOKEN_VALIDITY);
        String refreshToken = jwtTokenUtil.generateToken(userDto.getEmail(), JwtTokenUtil.JWT_REFRESH_TOKEN_VALIDITY);
        UserDto user = userMapper.entityToDto(userEntity);
//        UserDto user = UserDto.builder().id(userEntity.getId()).userName(userEntity.getUserName()).email(userEntity.getEmail()).password(userEntity.getPassword()).imageURL(userEntity.getImageURL()).build();
        return AuthenticationDto.builder().jsonWebToken(new JsonWebToken(accessToken, refreshToken)).accountStatus(AccountStatus.OLD_USER).userDto(user).build();
    }

    @Override
    public JsonWebToken refreshToken(String refreshToken) {
        try {
            String email = jwtTokenUtil.getEmailFromToken(refreshToken);
            UserEntity userEntity = userRepository.findAccountEntityByEmail(email).orElseThrow(() -> {
                throw new ResourceNotFoundException("refreshToken invalid");
            });
            if (jwtTokenUtil.validateToken(refreshToken, userEntity.getEmail())) {
                String accessToken = jwtTokenUtil.generateToken(userEntity.getEmail(), JwtTokenUtil.JWT_ACCESS_TOKEN_VALIDITY);
                return new JsonWebToken(accessToken, refreshToken);
            } else {
                throw new ResourceInvalidException("refreshToken invalid");
            }
        } catch (Exception e) {
            throw new ResourceInvalidException(e.getMessage());
        }
    }

    @Override
    public void forgetAccount(AuthRequest authRequest) {
        UserEntity userEntity = userRepository.findAccountEntityByEmail(authRequest.getEmail()).orElseThrow(() -> {
            throw new ResourceNotFoundException("email invalid");
        });
        String otp = CodeGeneratorUtils.invoke();
        authRequest.setOtp(otp);
        cacheAuth.put(authRequest.getEmail(), authRequest);
        emailUtils.sendEmailInviteToRoom("your otp is", authRequest.getEmail(), "FORGOT PASSWORD");
    }

    @Override
    public UserEntity validateForgetAccount(AuthRequest authRequest) {
        if(authRequest.getPassword().isEmpty()) throw new ResourceInvalidException("please fill your password");
        AuthRequest cache = cacheAuth.get(authRequest.getEmail());
        if (cache == null || !cache.getOtp().equals(authRequest.getOtp()))
            throw new ResourceInvalidException("cant validate account");
        UserEntity user = userRepository.findAccountEntityByEmail(cache.getEmail()).orElseThrow(() -> {
            throw new ResourceNotFoundException("account not found");
        });
        cacheAuth.remove(authRequest.getEmail());
        user.setPassword(cache.getPassword());
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> accountEntity = userRepository.findAccountEntityByEmail(username);
        if (accountEntity.isPresent()) {
            return new User(accountEntity.get().getEmail(), "", new ArrayList<>());
        } else {
            throw new ResourceNotFoundException(username + " invalid");
        }
    }
}
