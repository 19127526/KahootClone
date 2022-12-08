package com.example.backend.service.impl;

import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.mapper.AnswerMapper;
import com.example.backend.model.dto.AnswerDto;
import com.example.backend.model.entity.AnswerEntity;
import com.example.backend.model.entity.QuestionEntity;
import com.example.backend.repository.AnswerRepository;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.service.AnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AnswerServiceImpl implements AnswerService {
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final AnswerMapper answerMapper;

    @Override
    public AnswerEntity addAnswer(AnswerDto answerDto) {
        QuestionEntity question = questionRepository.findById(answerDto.getQuestion()).orElseThrow(() -> {
            throw new ResourceNotFoundException("slide not found");
        });
        AnswerEntity answerEntity = answerMapper.dtoToEntity(answerDto);
        question.addAnswer(answerEntity);
        questionRepository.save(question);
        return answerRepository.save(answerEntity);
    }

    @Override
    public void removeAnswer(AnswerDto answerDto) {
        AnswerEntity answerEntity = answerRepository.findById(answerDto.getId()).orElseThrow(() -> {
            throw new ResourceNotFoundException("options not found");
        });
        QuestionEntity questionEntity = questionRepository.findById(answerDto.getQuestion()).orElseThrow(() -> {
            throw new ResourceNotFoundException("slide not found");
        });
        questionEntity.removeAnswer(answerEntity);
        answerRepository.delete(answerEntity);
        questionRepository.save(questionEntity);
    }

    @Override
    public AnswerEntity updateAnswer(AnswerDto answerDto) {
        log.error(answerDto.toString());
        AnswerEntity answer = answerRepository.findById(answerDto.getId()).orElseThrow(() -> {
            throw new ResourceInvalidException("option not found");
        });
        answer.setText(answerDto.getText());
        return answerRepository.save(answer);
    }


}