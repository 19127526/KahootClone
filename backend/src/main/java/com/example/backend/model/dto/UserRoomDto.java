package com.example.backend.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserRoomDto {
    private String email;
    private Integer score;
}
