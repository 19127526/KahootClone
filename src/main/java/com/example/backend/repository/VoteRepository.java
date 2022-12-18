package com.example.backend.repository;

import com.example.backend.model.entity.VoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<VoteEntity, Long>, VoteRepositoryCustom, SlideVoteRepositoryCustom{
    List<VoteEntity> findVoteEntitiesBySlide_Id(long slideId);
//    List<VoteEntity> findAnswerEntitiesByQuestionId_IdAndTextIn(long questionId, List<String> text);
//    void deleteByQuestion_Id(long questionId);
}
