package com.example.backend.service;

import com.example.backend.model.dto.AccountDto;
import com.example.backend.model.dto.AuthenticationDto;
import com.example.backend.model.entity.AccountEntity;
import com.example.backend.model.request.ValidateRequest;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

public interface AccountService {
    AccountEntity accountValidate(ValidateRequest validateRequest);
    AuthenticationDto login(OAuth2AuthenticationToken oAuth2AuthenticationToken);
    AccountEntity update(AccountDto accountDto);
}
