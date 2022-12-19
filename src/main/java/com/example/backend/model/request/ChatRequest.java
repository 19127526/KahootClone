package com.example.backend.model.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChatRequest {
    private String sender;
    private String mess;
    private Long presentation;
}
