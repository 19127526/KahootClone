package com.example.backend.model.request;

import lombok.Data;

@Data
public class CreateQuestionRequest {
    private long presentationId;
    private String text;
}
