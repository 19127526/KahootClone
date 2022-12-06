package com.example.backend.model.request;

import lombok.Data;

@Data
public class CreateQuestionRequest {
    private long presentationID;
    private String text;
}
