package com.example.backend.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserQuestionDto {
    private long id;
    private Integer scores;
    private long question;
    private String user;
    private String answer;
}
