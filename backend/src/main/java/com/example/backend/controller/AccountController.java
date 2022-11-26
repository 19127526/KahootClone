package com.example.backend.controller;

import com.example.backend.common.controller.BaseController;
import com.example.backend.mapper.AccountMapper;
import com.example.backend.model.dto.AccountDto;
import com.example.backend.model.dto.AuthenticationDto;
import com.example.backend.model.request.ValidateRequest;
import com.example.backend.service.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RequestMapping("account")
@RestController
@RequiredArgsConstructor
@Slf4j
public class AccountController extends BaseController {
    private final AccountService accountService;
    private final AccountMapper accountMapper;

    @PostMapping("authentication")
    public ResponseEntity<AuthenticationDto> authentication(OAuth2AuthenticationToken oAuth2AuthenticationToken) {
        return ResponseEntity.status(HttpStatus.OK).body(accountService.login(oAuth2AuthenticationToken));
    }

    @PostMapping("validate/otp")
    public ResponseEntity<AccountDto> validateAccount(@RequestBody ValidateRequest validateRequest) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(accountMapper.entityToDto(accountService.accountValidate(validateRequest)));
    }

    @PostMapping("update")
    public ResponseEntity<AccountDto> updateAccount(@ModelAttribute("value") AccountDto accountDto) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(accountMapper.entityToDto(accountService.update(accountDto)));
    }
}
