package com.example.backend.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserAnswerDto {
    private long id;
    private long question;
    private String userr;
    private long answer;
}
