package com.example.backend.controller;

import com.example.backend.mapper.QuestionMapper;
import com.example.backend.model.dto.QuestionDto;
import com.example.backend.model.request.CreateQuestionRequest;
import com.example.backend.model.request.PlayingRequest;
import com.example.backend.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("slide")
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper questionMapper;
    @PostMapping("add")
    public ResponseEntity<QuestionDto> addQuestion(@RequestBody CreateQuestionRequest createQuestionRequest) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(questionMapper.entityToDto(questionService.createQuestion(createQuestionRequest)));
    }

    @PostMapping("update")
    public ResponseEntity<QuestionDto> updateQuestion(@RequestBody QuestionDto questionDto) {
        System.out.println("==================");
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(questionMapper.entityToDto(questionService.updateQuestion(questionDto)));
    }

    @PostMapping("delete")
    public ResponseEntity<Object> deleteQuestion(@RequestBody QuestionDto questionDto) {
        questionService.deleteQuestion(questionDto);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(null);
    }
    @GetMapping("detail")
    public ResponseEntity<QuestionDto> getDetail(long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(questionMapper.entityToDto(questionService.getDetail(id)));
    }

    @PostMapping("play")
    public ResponseEntity<Boolean> choseAnswer(@RequestBody PlayingRequest playingRequest) {
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(questionService.choseAnswer(playingRequest));
    }
}
