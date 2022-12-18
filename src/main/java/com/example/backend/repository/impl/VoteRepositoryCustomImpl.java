package com.example.backend.repository.impl;

import com.example.backend.model.entity.VoteEntity;
import com.example.backend.repository.VoteRepositoryCustom;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class VoteRepositoryCustomImpl implements VoteRepositoryCustom {
    @Override
    public List<VoteEntity> findVotesExistInListId(List<Long> listId) {
        return null;
    }
}
