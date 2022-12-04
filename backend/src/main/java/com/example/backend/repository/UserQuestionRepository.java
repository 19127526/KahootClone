package com.example.backend.repository;

import com.example.backend.model.entity.UserQuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserQuestionRepository extends JpaRepository<UserQuestionEntity, Long> {
    List<UserQuestionEntity> findUserQuestionEntityByUser_EmailAndQuestion_Id(String email, long questionId);
//    void deleteAllByUser_EmailAndQuestion_Id(String email, long questionId);
}
