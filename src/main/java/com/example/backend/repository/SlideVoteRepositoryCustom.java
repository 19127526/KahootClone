package com.example.backend.repository;

import com.querydsl.core.Tuple;

import java.util.Optional;

public interface SlideVoteRepositoryCustom {
    /**
     * get data from voteId
     * @param voteId
     * @return VOTE, SLIDE
     */
    Optional<Tuple> getVoteAndSlideFromVoteId(long voteId);
}
