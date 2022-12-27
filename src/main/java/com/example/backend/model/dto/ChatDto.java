package com.example.backend.model.dto;

import lombok.Data;

@Data
public class ChatDto {
    private String sender;
    private String mess;
    private Long presentId;
}
