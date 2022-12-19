package com.example.backend.model.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VoteRequest {
    private Long id;
    private Long slideId;
    private String text;
}
