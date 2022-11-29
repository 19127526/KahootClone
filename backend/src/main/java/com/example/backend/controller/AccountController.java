package com.example.backend.controller;

import com.example.backend.common.controller.BaseController;
import com.example.backend.mapper.AccountMapper;
import com.example.backend.mapper.RoomMapper;
import com.example.backend.model.dto.AccountDto;
import com.example.backend.model.dto.AuthenticationDto;
import com.example.backend.model.dto.JsonWebToken;
import com.example.backend.model.dto.RoomDto;
import com.example.backend.model.request.ValidateRequest;
import com.example.backend.service.AccountService;
import com.example.backend.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("account")
@RestController
@RequiredArgsConstructor
@Slf4j
public class AccountController extends BaseController {
    private final AccountService accountService;
    private final AccountMapper accountMapper;
    private final RoomMapper roomMapper;
    private final RoomService roomService;

    @GetMapping("login")
    public ResponseEntity<AuthenticationDto> authentication(OAuth2AuthenticationToken oAuth2AuthenticationToken) {
        return ResponseEntity.status(HttpStatus.OK).body(accountService.loginSocial(oAuth2AuthenticationToken));
    }

    @PostMapping("register")
    public ResponseEntity<AuthenticationDto> register(@RequestBody AccountDto accountDto) {
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(accountService.register(accountDto));
    }
    @PostMapping("validate/otp")
    public ResponseEntity<Boolean> validateAccount(@RequestBody ValidateRequest validateRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(accountService.validateAccount(validateRequest));
    }

    @PostMapping("loginTraditional")
    public ResponseEntity<AuthenticationDto> login(@RequestBody AccountDto accountDto) {
        return ResponseEntity.status(HttpStatus.OK).body(accountService.loginTraditional(accountDto));
    }

    @GetMapping("refreshToken")
    public ResponseEntity<JsonWebToken> refreshToken() {
        return null;
    }

    @PostMapping("update")
    public ResponseEntity<AccountDto> updateAccount(@ModelAttribute("value") AccountDto accountDto) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(accountMapper.entityToDto(accountService.update(accountDto)));
    }

    @GetMapping("listRoomCreated")
    public ResponseEntity<List<RoomDto>> getListRoomCreated(String email) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(roomService.getListRoomCreated(email).stream().map(roomMapper::entityToDto).toList());
    }

    @GetMapping("listRoomJoined")
    public ResponseEntity<List<RoomDto>> getListRoomJoined(String email) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(roomService.fetchRoomsJoined(email).stream().map(roomMapper::entityToDto).toList());
    }
}
