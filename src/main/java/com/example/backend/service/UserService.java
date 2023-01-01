package com.example.backend.service;

import com.example.backend.model.dto.UserDto;
import com.example.backend.model.dto.AuthenticationDto;
import com.example.backend.model.dto.JsonWebToken;
import com.example.backend.model.entity.UserEntity;
import com.example.backend.model.request.AuthRequest;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    AuthenticationDto loginSocial(AuthRequest authRequest);
    UserEntity update(UserDto userDto);
    AuthenticationDto register(AuthRequest authRequest);
    Boolean validateRegisterAccount(AuthRequest authRequest);
    AuthenticationDto loginTraditional(UserDto userDto);
    JsonWebToken refreshToken(String refreshToken);
    void forgetAccount(AuthRequest authRequest);
    void validateOtp(AuthRequest authRequest);
    void changePassword(AuthRequest authRequest);
}
