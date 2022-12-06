package com.example.backend.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AnswerDto {
    private long id;
    private String text;
    private long question;
    private List<UserAnswerDto> userAnswers;
}
