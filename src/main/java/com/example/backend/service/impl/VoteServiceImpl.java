package com.example.backend.service.impl;

import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.entity.SlideEntity;
import com.example.backend.model.entity.VoteEntity;
import com.example.backend.model.request.VoteRequest;
import com.example.backend.repository.SlideRepository;
import com.example.backend.repository.VoteRepository;
import com.example.backend.service.VoteService;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class VoteServiceImpl implements VoteService {
    private final SlideRepository slideRepository;
    private final VoteRepository voteRepository;

    @Override
    public VoteEntity addVote(VoteRequest voteRequest) {
        SlideEntity slide = slideRepository.findById(voteRequest.getSlideId()).orElseThrow(() -> {
            throw new ResourceNotFoundException("slide not found");
        });
        VoteEntity voteEntity = new VoteEntity();
        voteEntity.setText(voteRequest.getText());
        slide.addVote(voteEntity);
        slideRepository.save(slide);
        return voteRepository.save(voteEntity);
    }

    @Override
    public void removeVote(VoteRequest voteRequest) {
        Tuple voteSlide = voteRepository.getVoteAndSlideFromVoteId(voteRequest.getId()).orElseThrow(() -> {
            throw new ResourceNotFoundException("delete vote error");
        });
        SlideEntity slide = (SlideEntity) voteSlide.toArray()[1];
        VoteEntity vote = (VoteEntity) voteSlide.toArray()[0];
        slide.removeVote(vote);
        voteRepository.delete(vote);
        slideRepository.save(slide);
    }

    @Override
    public VoteEntity updateVote(VoteRequest voteRequest) {
        VoteEntity vote = voteRepository.findById(voteRequest.getId()).orElseThrow(() -> {
            throw new ResourceInvalidException("option not found");
        });
        vote.setText(voteRequest.getText());
        return voteRepository.save(vote);
    }
}
