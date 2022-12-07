package com.example.backend.controller;

import com.example.backend.mapper.AnswerMapper;
import com.example.backend.model.dto.AnswerDto;
import com.example.backend.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("option")
@RequiredArgsConstructor
public class OptionController {
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;

    @PostMapping("add")
    public ResponseEntity<AnswerDto> addOption(@RequestBody AnswerDto answerDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(answerMapper.entityToDto(answerService.addAnswer(answerDto)));
    }

    @PostMapping("delete")
    public ResponseEntity<Object> removeOption(@RequestBody AnswerDto answerDto) {
        answerService.removeAnswer(answerDto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}
