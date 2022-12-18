package com.example.backend.repository;

import com.example.backend.model.entity.VoteEntity;

import java.util.List;

public interface VoteRepositoryCustom {
    List<VoteEntity> findVotesExistInListId(List<Long> listId);
}
