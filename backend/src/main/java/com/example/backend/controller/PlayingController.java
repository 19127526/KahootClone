package com.example.backend.controller;

import com.example.backend.common.controller.BaseController;
import com.example.backend.model.request.PlayingRequest;
import com.example.backend.service.PlayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("play")
public class PlayingController extends BaseController {
    private final PlayService playService;
    @PostMapping("answer/chose")
    public ResponseEntity<Boolean> choseAnswer(@RequestBody PlayingRequest playingRequest) {
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(playService.choseAnswer(playingRequest));
    }

    @PostMapping("answer/delete")
    public ResponseEntity<Object> deleteAnswer(@RequestBody PlayingRequest playingRequest) {
        playService.removeAnswer(playingRequest);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(null);
    }
}
