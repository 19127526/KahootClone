package com.example.backend.service;

import com.example.backend.model.dto.UserDto;
import com.example.backend.model.dto.AuthenticationDto;
import com.example.backend.model.dto.JsonWebToken;
import com.example.backend.model.entity.UserEntity;
import com.example.backend.model.request.AuthRequest;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

public interface AccountService extends UserDetailsService {
    AuthenticationDto loginSocial(OAuth2AuthenticationToken oAuth2AuthenticationToken);
    UserEntity update(UserDto userDto);
    AuthenticationDto register(AuthRequest authRequest);
    Boolean validateRegisterAccount(AuthRequest authRequest);
    AuthenticationDto loginTraditional(UserDto userDto);
    JsonWebToken refreshToken(String refreshToken);
}
