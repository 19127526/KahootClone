package com.example.backend.model.request;

import lombok.Data;

@Data
public class PresentationRequest {
    private Long id;
    private String email;
    private String namePresentation;
    private String urlPresentation;

}
