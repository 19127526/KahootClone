package com.example.backend.service;

import com.example.backend.model.dto.AnswerDto;
import com.example.backend.model.entity.AnswerEntity;

public interface AnswerService {
    AnswerEntity addAnswer(AnswerDto answerDto);
    void removeAnswer(AnswerDto answerDto);
}
