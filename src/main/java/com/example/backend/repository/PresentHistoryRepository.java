package com.example.backend.repository;

import com.example.backend.model.entity.PresentHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PresentHistoryRepository extends JpaRepository<PresentHistoryEntity, Long> {
    Optional<PresentHistoryEntity> findPresentHistoryEntityByPresentation_IdAndUsers_Email(long presentationId, String email);
    Optional<PresentHistoryEntity> findPresentHistoryEntityByPresentation_IdAndPresented(long presentationId, boolean status);
    Optional<PresentHistoryEntity> findPresentHistoryEntityByGroupIdAndPresented(long groupId, boolean status);

    List<PresentHistoryEntity> findPresentHistoryEntitiesByUsers_EmailAndPresented(String email, boolean present);
}
