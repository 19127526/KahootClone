package com.example.backend.service;

import com.example.backend.model.dto.AccountDto;
import com.example.backend.model.entity.AccountEntity;
import com.example.backend.model.entity.ValidateAccount;

public interface AccountService {
    Boolean register(AccountDto accountDto);
    AccountEntity validateRegister (ValidateAccount validateAccount);
    AccountEntity saveAccount(AccountDto accountDto);
    AccountEntity login(AccountDto accountDto);
}
