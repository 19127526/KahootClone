package com.example.backend.controller;

import com.example.backend.mapper.AccountMapper;
import com.example.backend.model.dto.AccountDto;
import com.example.backend.model.entity.ValidateAccount;
import com.example.backend.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;
    private final AccountMapper accountMapper;

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody AccountDto accountDto) {
        return new ResponseEntity<>(accountService.register(accountDto).toString(), HttpStatus.ACCEPTED);
    }

    @PostMapping("register/validate")
    public ResponseEntity<AccountDto> registerValidate(@RequestBody ValidateAccount validateAccount) {
        return new ResponseEntity<>(accountMapper.entityToDto(accountService.validateRegister(validateAccount)), HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<AccountDto> login(@RequestBody AccountDto accountDto) {
        return new ResponseEntity<>(accountMapper.entityToDto(accountService.login(accountDto)),HttpStatus.OK);
    }
}
