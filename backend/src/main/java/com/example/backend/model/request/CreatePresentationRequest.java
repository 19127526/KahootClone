package com.example.backend.model.request;

import lombok.Data;

@Data
public class CreatePresentationRequest {
    private long GroupId;
    private String name;
    private String email;
}
