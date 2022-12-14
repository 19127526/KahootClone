package com.example.backend.repository;

import com.example.backend.model.entity.UserVoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserQuestionRepository extends JpaRepository<UserVoteEntity, Long> {
}
