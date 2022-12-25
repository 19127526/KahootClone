package com.example.backend.repository;

import com.example.backend.model.entity.UserVoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserVoteRepository extends JpaRepository<UserVoteEntity, Long> {
    List<UserVoteEntity> findUserVoteEntitiesByVoteIdAndPresentId(long voteId, long presentId);
}
