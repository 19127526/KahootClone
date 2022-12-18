package com.example.backend.repository;

import com.example.backend.model.entity.PresentationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface PresentationRepository extends JpaRepository<PresentationEntity, Long>, SlidePresentCustom {
    Optional<PresentationEntity> findPresentationEntityByAuthor_EmailAndId(String email, long presentId);
//    List<PresentationEntity> findPresentationEntitiesByGroup_IdAndIsPublic(long groupId, boolean isPublic);
//    Optional<PresentationEntity> findPresentationEntityByGroup_IdAndName(long GroupId, String name);
}
