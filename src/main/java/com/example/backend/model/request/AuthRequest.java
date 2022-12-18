package com.example.backend.model.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthRequest {
    private String userName;
    private String password;
    private String email;
    private String imageURL;
    private String otp;
}
