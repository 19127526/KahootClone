package com.example.backend.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.backend.common.exception.TechnicalException;
import com.example.backend.common.model.AccountStatus;
import com.example.backend.common.utils.CodeGeneratorUtils;
import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.mapper.AccountMapper;
import com.example.backend.model.dto.AccountDto;
import com.example.backend.model.dto.AuthenticationDto;
import com.example.backend.model.entity.AccountEntity;
import com.example.backend.model.request.ValidateRequest;
import com.example.backend.repository.AccountRepository;
import com.example.backend.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private static final String REDIS_KEY_OTP = "redis:otp";
    private static final String REDIS_KEY_ACCOUNT = "redis:account";
    //    @Value("${CLOUDINARY_URL}")
    private final String cloudinary_url = "cloudinary://683585168923456:LTr8lMano9zTFAXyzub0VPY08nQ@dscc9chrk";
    private final RedisTemplate<String, Object> template;
    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;

    @Override
    public AccountEntity accountValidate(ValidateRequest validateRequest) {
        try {
            String otp = Objects.requireNonNull(template.opsForHash().get(REDIS_KEY_OTP, validateRequest.getEmail())).toString();
            if (!otp.equals(validateRequest.getOtp())) throw new ResourceInvalidException("OTP invalid");
            else {
                AccountDto accountDto = (AccountDto) template.opsForHash().get(REDIS_KEY_ACCOUNT, validateRequest.getEmail());
                if (accountDto == null) throw new ResourceInvalidException("Account invalid");
                else {
                    template.opsForHash().delete(REDIS_KEY_OTP, validateRequest.getEmail());
                    template.opsForHash().delete(REDIS_KEY_ACCOUNT, validateRequest.getEmail());
                    return accountRepository.save(accountMapper.dtoToEntity(accountDto));
                }
            }
        } catch (Exception e) {
            throw new TechnicalException(e.getMessage());
        }
    }

    @Override
    public AuthenticationDto login(OAuth2AuthenticationToken oAuth2AuthenticationToken) {
        AuthenticationDto authenticationDto = new AuthenticationDto();
        authenticationDto.setAccountStatus(AccountStatus.OLD_USER);
        AccountDto accountDto = convertOAuthToAccount(oAuth2AuthenticationToken.getPrincipal().getAttributes());
        Optional<AccountEntity> accountEntity = accountRepository.findAccountEntityByEmail(accountDto.getEmail());
        if (accountEntity.isEmpty()) {
            template.opsForHash().put(REDIS_KEY_ACCOUNT, accountDto.getEmail(), accountDto);
            template.opsForHash().put(REDIS_KEY_OTP, accountDto.getEmail(), CodeGeneratorUtils.invoke());
            authenticationDto.setEmail(accountDto.getEmail());
            authenticationDto.setAccountStatus(AccountStatus.NEW_USER);
        } else authenticationDto.setAccountDto(accountMapper.entityToDto(accountEntity.get()));
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
            accountEntity.setImageUrl(cloudinary_response.get("url").toString());
            accountEntity.setUserName(accountDto.getUserName());
            return accountRepository.save(accountEntity);
        } catch (IOException e) {
            throw new TechnicalException(e.getMessage());
        }
    }
}
