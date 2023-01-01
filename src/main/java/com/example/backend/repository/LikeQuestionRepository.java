package com.example.backend.repository;

import com.example.backend.model.entity.LikeQuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeQuestionRepository extends JpaRepository<LikeQuestionEntity, Long> {
    Optional<LikeQuestionEntity> findLikeQuestionEntityByEmailAndQuestion_Id(String email, long questionId);
}
