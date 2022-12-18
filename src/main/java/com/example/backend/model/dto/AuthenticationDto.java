package com.example.backend.model.dto;

import com.example.backend.common.model.AccountStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationDto {
    private AccountStatus accountStatus;
    private String email;
    private UserDto userDto;
    private JsonWebToken jsonWebToken;
}
