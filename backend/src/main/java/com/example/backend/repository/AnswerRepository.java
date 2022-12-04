package com.example.backend.repository;

import com.example.backend.model.entity.AnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<AnswerEntity, Long> {
    List<AnswerEntity> findAnswerEntitiesByQuestionId_IdAndTextIn(long questionId, List<String> text);
}
