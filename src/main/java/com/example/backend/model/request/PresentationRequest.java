package com.example.backend.model.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PresentationRequest {
    private Long id;
    private String email;
    private String emailInvited;
    private String emailRemoved;
    private String namePresentation;
    private String urlPresentation;

}
