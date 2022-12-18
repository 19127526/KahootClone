package com.example.backend.service;

import com.example.backend.model.entity.VoteEntity;
import com.example.backend.model.request.VoteRequest;

public interface VoteService {
    VoteEntity addVote(VoteRequest voteRequest);

    void removeVote(VoteRequest voteRequest);

    VoteEntity updateVote(VoteRequest voteRequest);
}
