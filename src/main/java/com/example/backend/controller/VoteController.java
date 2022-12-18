package com.example.backend.controller;

import com.example.backend.mapper.VoteMapper;
import com.example.backend.model.dto.VoteDto;
import com.example.backend.model.entity.VoteEntity;
import com.example.backend.model.request.VoteRequest;
import com.example.backend.service.VoteService;
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
public class VoteController {
    private final VoteService voteService;

    private final VoteMapper voteMapper;
    @PostMapping("add")
    public ResponseEntity<VoteDto> addVote(@RequestBody VoteRequest voteRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(voteMapper.entityToDto(voteService.addVote(voteRequest)));
    }

    @PostMapping("delete")
    public ResponseEntity<Object> removeVote(@RequestBody VoteRequest voteRequest) {
        voteService.removeVote(voteRequest);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    @PostMapping("update")
    public ResponseEntity<VoteDto> updateVote(@RequestBody VoteRequest voteRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(voteMapper.entityToDto(voteService.updateVote(voteRequest)));
    }
}
