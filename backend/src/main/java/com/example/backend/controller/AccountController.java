package com.example.backend.controller;

import com.example.backend.common.controller.BaseController;
import com.example.backend.mapper.AccountMapper;
import com.example.backend.model.dto.AccountDto;
import com.example.backend.model.entity.ValidateAccount;
import com.example.backend.service.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("account")
@RestController
@RequiredArgsConstructor
@Slf4j
public class AccountController extends BaseController {
    private final AccountService accountService;
    private final AccountMapper accountMapper;

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody AccountDto accountDto) {
        return new ResponseEntity<>(accountService.register(accountDto).toString(), HttpStatus.ACCEPTED);
    }

    @GetMapping("register/validate")
    public ResponseEntity<String> registerValidate(String mess) {
        log.error(mess);
        return ResponseEntity.status(HttpStatus.OK).body(mess);
//        return new ResponseEntity<>(accountMapper.entityToDto(accountService.validateRegister(validateAccount)), HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<AccountDto> login(@RequestBody AccountDto accountDto) {
        return new ResponseEntity<>(accountMapper.entityToDto(accountService.login(accountDto)), HttpStatus.OK);
    }

    @PostMapping("update")
    public ResponseEntity<AccountDto> updateAccount(@ModelAttribute("value") AccountDto accountDto) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(accountMapper.entityToDto(accountService.update(accountDto)));
    }
}
