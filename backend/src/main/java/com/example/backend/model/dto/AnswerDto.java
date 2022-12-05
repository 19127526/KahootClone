package com.example.backend.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AnswerDto {
    private long id;
    private long questionId;
    private String text;
    private int score;
    private List<UserQuestionDto> userQuestions;
}
