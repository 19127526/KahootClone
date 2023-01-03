package com.example.backend.model.dto;

import com.example.backend.common.model.RolePresentation;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserPresentationDto {
    private String email;
    private String image;
    private RolePresentation roles;
}
