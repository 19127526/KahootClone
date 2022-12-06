package com.example.backend.repository;

import com.example.backend.model.entity.UserAnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserQuestionRepository extends JpaRepository<UserAnswerEntity, Long> {
    List<UserAnswerEntity> findUserQuestionEntityByUserrAndQuestion(String email, long questionId);
//    void deleteAllByUser_EmailAndQuestion_Id(String email, long questionId);
}
