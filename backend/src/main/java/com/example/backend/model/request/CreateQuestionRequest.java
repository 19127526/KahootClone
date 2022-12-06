package com.example.backend.model.request;

import lombok.Data;

@Data
public class CreateQuestionRequest {
    private long PresentationId;
    private String text;
}
