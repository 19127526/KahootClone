package com.example.backend.model.entity;

import com.example.backend.common.model.AccountStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValidateAccount implements Serializable {
    private String email = "";
    private String otp = "";
    private String userName = "";
    private String password = "";
    private AccountStatus accountStatus;
}
