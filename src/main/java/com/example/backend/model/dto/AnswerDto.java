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

    @Override
    public String toString() {
        return "AnswerDto{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", question=" + question +
                '}';
    }

    private List<UserAnswerDto> userAnswers;
}
