package com.example.backend.controller;

import com.example.backend.common.controller.BaseController;
import com.example.backend.mapper.ChatMapper;
import com.example.backend.model.dto.ChatDto;
import com.example.backend.model.dto.PresentDto;
import com.example.backend.model.request.ChatRequest;
import com.example.backend.model.request.InteractPresentRequest;
import com.example.backend.service.RealTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("present")
public class RealTimeController extends BaseController {
    private final RealTimeService realTimeService;
    private final ChatMapper chatMapper;

    @PostMapping("vote/chose")
    public ResponseEntity<Object> choseAnswer(@RequestBody InteractPresentRequest interact) {
        realTimeService.choseVote(interact);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
    }

    @PostMapping("connect")
    public ResponseEntity<PresentDto> connect(@RequestBody InteractPresentRequest interact) {
        return ResponseEntity.status(HttpStatus.OK).body(realTimeService.connect(interact));
    }

    @PostMapping("changeSlide")
    public ResponseEntity<Object> playNext(@RequestBody InteractPresentRequest interact) {
        realTimeService.changeSlide(interact);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @PostMapping("start")
    public ResponseEntity<PresentDto> present(@RequestBody InteractPresentRequest interact) {
        return ResponseEntity.status(HttpStatus.OK).body(realTimeService.startPresent(interact));
    }

    @PostMapping("stop")
    public ResponseEntity<Object> stopPresent(@RequestBody InteractPresentRequest interactPresentRequest) {
        realTimeService.stopPresent(interactPresentRequest);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @MessageMapping("/presentation")
    public void receiveMessageChat(@Payload ChatRequest chatRequest) {
        realTimeService.sendMessage(chatRequest);
    }

    @GetMapping("/chat")
    public ResponseEntity<List<ChatDto>> getChat(long presentId, long size, long offset) {
        return ResponseEntity.status(HttpStatus.OK).body(realTimeService.getChat(presentId, size, offset).stream().map(chatMapper::entityToDto).toList());
    }

    @PostMapping("/question")
    public ResponseEntity<Object> question(@RequestBody InteractPresentRequest interactPresentRequest) {
        realTimeService.askQuestion(interactPresentRequest);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @PostMapping("/question/like")
    public ResponseEntity<Object> likeQuestion(@RequestBody InteractPresentRequest interactPresentRequest) {
        realTimeService.likeQuestion(interactPresentRequest);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @PostMapping("/question/dislike")
    public ResponseEntity<Object> dislikeQuestion(@RequestBody InteractPresentRequest interactPresentRequest) {
        realTimeService.dislikeQuestion(interactPresentRequest);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @PostMapping("/question/mark")
    public ResponseEntity<Object> markQuestion(@RequestBody InteractPresentRequest interactPresentRequest) {
        realTimeService.markQuestion(interactPresentRequest, true);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @PostMapping("/question/unmark")
    public ResponseEntity<Object> unmarkQuestion(@RequestBody InteractPresentRequest interactPresentRequest) {
        realTimeService.markQuestion(interactPresentRequest, false);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}
