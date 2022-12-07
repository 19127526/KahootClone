package com.example.backend.service;

import com.example.backend.model.dto.QuestionDto;
import com.example.backend.model.entity.QuestionEntity;
import com.example.backend.model.request.CreateQuestionRequest;
import com.example.backend.model.request.PlayingRequest;

public interface QuestionService {
    void deleteQuestion(QuestionDto questionDto);

    QuestionEntity createQuestion(CreateQuestionRequest createQuestionRequest);

    QuestionEntity updateQuestion(QuestionDto questionDto);

    QuestionEntity getDetail(long id);

    Boolean choseAnswer(PlayingRequest playingRequest);

    QuestionEntity nextSlide(long slideId);

    QuestionEntity connect(long slideId);
}
