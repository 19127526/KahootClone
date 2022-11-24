package com.example.backend.service.impl;

import com.example.backend.common.exception.TechnicalException;
import com.example.backend.common.model.AccountStatus;
import com.example.backend.common.utils.CodeGeneratorUtils;
import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.mapper.AccountMapper;
import com.example.backend.model.dto.AccountDto;
import com.example.backend.model.entity.AccountEntity;
import com.example.backend.model.entity.ValidateAccount;
import com.example.backend.repository.AccountRepository;
import com.example.backend.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private static final String KEY = "redis:otp";
    private final RedisTemplate<String, Object> template;
    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;

    @Override
    public Boolean register(AccountDto accountDto) {
        try {
            if (accountRepository.findAccountEntityByEmail(accountDto.getEmail()).isPresent())
                throw new ResourceInvalidException(accountDto.getEmail() + " exists");
            ValidateAccount validateAccount = new ValidateAccount(
                    accountDto.getEmail(),
                    CodeGeneratorUtils.invoke(),
                    accountDto.getUserName(),
                    accountDto.getPassword(),
                    AccountStatus.REGISTER);
            template.opsForHash().put(KEY, accountDto.getEmail(), validateAccount);
            return true;
        } catch (Exception e) {
            throw new TechnicalException(e.getMessage());
        }
    }

    @Override
    public AccountEntity validateRegister(ValidateAccount validateAccount) {
        try {
            ValidateAccount result = validateOTP(validateAccount.getEmail(), validateAccount.getOtp());
            AccountEntity accountEntity = new AccountEntity();
            accountEntity.setEmail(result.getEmail());
            accountEntity.setPassword(result.getPassword());
            accountEntity.setUserName(result.getUserName());
            return accountRepository.save(accountEntity);
        } catch (Exception e) {
            throw new TechnicalException(e.getMessage());
        }
    }

    private ValidateAccount validateOTP(String email, String otp) {
        if (template.opsForHash().hasKey(KEY, email))
            throw new ResourceNotFoundException(email + " invalid");
        else {
            ValidateAccount cache = (ValidateAccount) template.opsForHash().get(KEY, email);
            if (cache != null) {
                if (cache.getOtp().equals(otp)) {
                    ValidateAccount result = (ValidateAccount) template.opsForHash().get(KEY, email);
                    template.opsForHash().delete(KEY,email);
                    return result;
                } else throw new ResourceInvalidException("otp is wrong");
            } else throw new ResourceNotFoundException(email + " invalid");
        }
    }

    @Override
    public AccountEntity saveAccount(AccountDto accountDto) {
        return accountRepository.save(accountMapper.dtoToEntity(accountDto));
    }

    @Override
    public AccountEntity login(AccountDto accountDto) {
        AccountEntity accountEntity = accountRepository.findAccountEntityByEmail(accountDto.getEmail()).orElseThrow(() -> new ResourceNotFoundException(accountDto.getEmail() + " invalid"));
        if (accountEntity.getPassword().equals(accountDto.getPassword())) return accountEntity;
        else throw new ResourceNotFoundException(accountDto.getEmail() + " invalid");
    }
}
