package com.example.backend.repository;

import com.example.backend.model.entity.QuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<QuestionEntity, Long> {
    List<QuestionEntity> findQuestionEntitiesBySlideIdAndPresentId(long slideId, long presentId);

    List<QuestionEntity> findQuestionEntitiesByPresentId(long presentId);
}
