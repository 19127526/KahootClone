package com.example.backend.repository;

import com.example.backend.model.entity.PresentHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PresentHistoryRepository extends JpaRepository<PresentHistoryEntity, Long> {
    Optional<PresentHistoryEntity> findPresentHistoryEntityByPresentationIdAndUserId(long presentationId, long userId);
    Optional<PresentHistoryEntity> findPresentHistoryEntityByPresentationIdAndPresented(long presentationId, boolean status);
    Optional<PresentHistoryEntity> findPresentHistoryEntityByGroupIdAndPresented(long groupId, boolean status);
}