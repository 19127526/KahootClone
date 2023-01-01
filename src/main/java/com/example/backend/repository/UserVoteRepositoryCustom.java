package com.example.backend.repository;

import com.querydsl.core.Tuple;

import java.util.List;

public interface UserVoteRepositoryCustom {
    List<Tuple> findVotesAndUserVotes(long slideId, long presentId);
}
