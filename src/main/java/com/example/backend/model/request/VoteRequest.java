package com.example.backend.model.request;

import lombok.Data;

@Data
public class VoteRequest {
    private Long id;
    private Long slideId;
    private String text;
}
