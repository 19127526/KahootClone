package com.example.backend.controller;

import com.example.backend.common.controller.BaseController;
import com.example.backend.model.dto.AuthenticationDto;
import com.example.backend.model.dto.JsonWebToken;
import com.example.backend.model.dto.UserDto;
import com.example.backend.model.request.AuthRequest;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthController extends BaseController {

    private final UserService userService;

    @PostMapping("loginSocial")
    public ResponseEntity<AuthenticationDto> authentication(@RequestBody AuthRequest oAuth2AuthenticationToken) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.loginSocial(oAuth2AuthenticationToken));
    }

    @PostMapping("register")
    public ResponseEntity<AuthenticationDto> register(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.register(authRequest));
    }

    @PostMapping("validate/otp")
    public ResponseEntity<Boolean> validateAccount(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.validateRegisterAccount(authRequest));
    }

    @PostMapping("loginTraditional")
    public ResponseEntity<AuthenticationDto> login(@RequestBody UserDto userDto) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.loginTraditional(userDto));
    }

    @PostMapping("refreshToken")
    public ResponseEntity<JsonWebToken> refreshToken(@RequestBody JsonWebToken jsonWebToken) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.refreshToken(jsonWebToken.getRefreshToken()));
    }

    @PostMapping("forget")
    public ResponseEntity<Object> forgetAccount(@RequestBody AuthRequest authRequest) {
        userService.forgetAccount(authRequest);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    @PostMapping("forget/otp")
    public ResponseEntity<Object> validateForget(@RequestBody AuthRequest authRequest) {
        userService.validateForgetAccount(authRequest);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
    }
}
