package com.example.backend.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.backend.common.exception.TechnicalException;
import com.example.backend.common.model.AccountStatus;
import com.example.backend.common.utils.CodeGeneratorUtils;
import com.example.backend.common.utils.EmailUtils;
import com.example.backend.common.utils.JwtTokenUtil;
import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.mapper.AccountMapper;
import com.example.backend.model.dto.AccountDto;
import com.example.backend.model.dto.AuthenticationDto;
import com.example.backend.model.dto.JsonWebToken;
import com.example.backend.model.entity.AccountEntity;
import com.example.backend.model.request.ValidateRequest;
import com.example.backend.repository.AccountRepository;
import com.example.backend.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AccountServiceImpl implements AccountService {
    private static final String REDIS_KEY_OTP = "redis:otp";
    private static final String REDIS_KEY_ACCOUNT = "redis:account";
    //    @Value("${CLOUDINARY_URL}")
    private final String cloudinary_url = "cloudinary://683585168923456:LTr8lMano9zTFAXyzub0VPY08nQ@dscc9chrk";
    private final RedisTemplate<String, Object> cache;
    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;
    private final JwtTokenUtil jwtTokenUtil;
    private final EmailUtils emailUtils;

//    @Override
//    public AccountEntity accountValidate(ValidateRequest validateRequest) {
//        try {
//            String otp = Objects.requireNonNull(cache.opsForHash().get(REDIS_KEY_OTP, validateRequest.getEmail())).toString();
//            if (!otp.equals(validateRequest.getOtp())) throw new ResourceInvalidException("OTP invalid");
//            else {
//                AccountDto accountDto = (AccountDto) cache.opsForHash().get(REDIS_KEY_ACCOUNT, validateRequest.getEmail());
//                if (accountDto == null) throw new ResourceInvalidException("Account invalid");
//                else {
//                    cache.opsForHash().delete(REDIS_KEY_OTP, validateRequest.getEmail());
//                    cache.opsForHash().delete(REDIS_KEY_ACCOUNT, validateRequest.getEmail());
//                    return accountRepository.save(accountMapper.dtoToEntity(accountDto));
//                }
//            }
//        } catch (Exception e) {
//            throw new TechnicalException(e.getMessage());
//        }
//    }

    @Override
    public AuthenticationDto loginSocial(OAuth2AuthenticationToken oAuth2AuthenticationToken) {
        AuthenticationDto authenticationDto = new AuthenticationDto();
        authenticationDto.setAccountStatus(AccountStatus.OLD_USER);
        AccountDto accountDto = convertOAuthToAccount(oAuth2AuthenticationToken.getPrincipal().getAttributes());
        Optional<AccountEntity> accountEntity = accountRepository.findAccountEntityByEmail(accountDto.getEmail());
        if (accountEntity.isEmpty()) {
            cache.opsForHash().put(REDIS_KEY_ACCOUNT, accountDto.getEmail(), accountDto);
            cache.opsForHash().put(REDIS_KEY_OTP, accountDto.getEmail(), CodeGeneratorUtils.invoke());
            authenticationDto.setEmail(accountDto.getEmail());
            authenticationDto.setAccountStatus(AccountStatus.NEW_USER);
        } else {
            authenticationDto.setAccountDto(accountMapper.entityToDto(accountEntity.get()));
            String at = jwtTokenUtil.generateToken(accountEntity.get().getEmail(), JwtTokenUtil.JWT_ACCESS_TOKEN_VALIDITY);
            String rt = jwtTokenUtil.generateToken(accountEntity.get().getEmail(), JwtTokenUtil.JWT_REFRESH_TOKEN_VALIDITY);
            authenticationDto.setJsonWebToken(new JsonWebToken(at, rt));
        }
        return authenticationDto;
    }

    private AccountDto convertOAuthToAccount(Map<String, Object> data) {
        AccountDto accountDto = new AccountDto();
        accountDto.setEmail((String) data.get("email"));
        accountDto.setUserName((String) data.get("name"));
        accountDto.setImageURL((String) data.get("picture"));
        return accountDto;
    }

    @Override
    public AccountEntity update(AccountDto accountDto) {
        AccountEntity accountEntity = accountRepository.findAccountEntityByEmail(accountDto.getEmail()).orElseThrow(() -> {
            throw new ResourceNotFoundException("account not exist");
        });
        Cloudinary cloudinary = new Cloudinary(cloudinary_url);
        cloudinary.config.secure = true;
        try {
            Map cloudinary_response = cloudinary
                    .uploader()
                    .upload(
                            accountDto.getImageFile().getBytes(),
                            ObjectUtils.asMap(
                                    "use_filename", true,
                                    "filename_override", accountDto.getImageFile().getOriginalFilename(),
                                    "unique_filename", false,
                                    "overwrite", true)
                    );
            accountEntity.setImageURL(cloudinary_response.get("url").toString());
            accountEntity.setUserName(accountDto.getUserName());
            return accountRepository.save(accountEntity);
        } catch (IOException e) {
            throw new TechnicalException(e.getMessage());
        }
    }

    @Override
    public AuthenticationDto register(AccountDto accountDto) {
        Optional<AccountEntity> accountEntity = accountRepository.findAccountEntityByEmail(accountDto.getEmail());
        if (accountEntity.isPresent()) throw new ResourceInvalidException("email " + accountDto.getEmail() + " exists");
        else {
            cache.opsForHash().put(REDIS_KEY_ACCOUNT, accountDto.getEmail(), accountDto);
            String otp = CodeGeneratorUtils.invoke();
            cache.opsForHash().put(REDIS_KEY_OTP, accountDto.getEmail(), otp);
            emailUtils.sendEmailInviteToRoom("your otp is: " + otp, accountDto.getEmail(), "REGISTER");
            AuthenticationDto authenticationDto = new AuthenticationDto();
            authenticationDto.setEmail(accountDto.getEmail());
            authenticationDto.setAccountStatus(AccountStatus.NEW_USER);
            return authenticationDto;
        }
    }

    @Override
    public Boolean validateAccount(ValidateRequest validateRequest) {
        Optional<AccountEntity> checking = accountRepository.findAccountEntityByEmail(validateRequest.getEmail());
        if (checking.isPresent()) throw new ResourceInvalidException("account is exists");
        if (!cache.opsForHash().hasKey(REDIS_KEY_ACCOUNT, validateRequest.getEmail()) || !cache.opsForHash().hasKey(REDIS_KEY_OTP, validateRequest.getEmail())) {
            throw new ResourceInvalidException("account or otp in valid");
        }
        AccountDto accountDto = (AccountDto) cache.opsForHash().get(REDIS_KEY_ACCOUNT,validateRequest.getEmail());
        String otp = (String) cache.opsForHash().get(REDIS_KEY_OTP,validateRequest.getEmail());
        if(!Objects.equals(otp, validateRequest.getOtp())) throw new ResourceInvalidException("otp invalid");
        else {
            AccountEntity accountEntity = accountMapper.dtoToEntity(accountDto);
            accountRepository.save(accountEntity);
            cache.opsForHash().delete(REDIS_KEY_ACCOUNT,validateRequest.getEmail());
            cache.opsForHash().delete(REDIS_KEY_OTP,validateRequest.getEmail());
            return true;
        }
    }

    @Override
    public AuthenticationDto loginTraditional(AccountDto accountDto) {
        AccountEntity accountEntity = accountRepository
                .findAccountEntityByEmailAndPassword(accountDto.getEmail(), accountDto.getPassword())
                .orElseThrow(() -> {
                    throw new ResourceNotFoundException("email or password invalid");
                });
        JsonWebToken jsonWebToken =
                new JsonWebToken(
                        jwtTokenUtil.generateToken(accountDto.getEmail(), JwtTokenUtil.JWT_ACCESS_TOKEN_VALIDITY),
                        jwtTokenUtil.generateToken(accountDto.getEmail(), JwtTokenUtil.JWT_REFRESH_TOKEN_VALIDITY));
        AuthenticationDto authenticationDto = new AuthenticationDto();
        authenticationDto.setJsonWebToken(jsonWebToken);
        authenticationDto.setAccountStatus(AccountStatus.OLD_USER);
        authenticationDto.setAccountDto(accountMapper.entityToDto(accountEntity));
        return authenticationDto;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AccountEntity> accountEntity = accountRepository.findAccountEntityByEmail(username);
        if (accountEntity.isPresent()) {
            return new User(accountEntity.get().getEmail(), "", new ArrayList<>());
        } else {
            throw new ResourceNotFoundException(username + " invalid");
        }
    }
}
