package com.example.backend.model.request;

import lombok.Data;

@Data
public class ChatRequest {
    private String sender;
    private String mess;
    private Long presentation;
}
