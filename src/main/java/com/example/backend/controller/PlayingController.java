package com.example.backend.controller;

import com.example.backend.common.controller.BaseController;
import com.example.backend.mapper.QuestionMapper;
import com.example.backend.model.dto.QuestionDto;
import com.example.backend.model.request.NextSlideRequest;
import com.example.backend.model.request.PlayingRequest;
import com.example.backend.service.PlayService;
import com.example.backend.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("play")
public class PlayingController extends BaseController {
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;
    @PostMapping("answer/chose")
    public ResponseEntity<Boolean> choseAnswer(@RequestBody PlayingRequest playingRequest) {
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(questionService.choseAnswer(playingRequest));
    }

    @GetMapping("nextSlide")
    public ResponseEntity<QuestionDto> playNext(long slideId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                // checking is close present
                .body(questionMapper.entityToDto(questionService.nextSlide(slideId)));
    }

    @GetMapping("connect")
    public ResponseEntity<QuestionDto> connect(long presentationId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                // checking is close present
                .body(questionMapper.entityToDto(questionService.connect(presentationId)));
    }


//    @PostMapping("answer/delete")
//    public ResponseEntity<Object> deleteAnswer(@RequestBody PlayingRequest playingRequest) {
//        playService.removeAnswer(playingRequest);
//        return ResponseEntity
//                .status(HttpStatus.NO_CONTENT)
//                .body(null);
//    }
}
