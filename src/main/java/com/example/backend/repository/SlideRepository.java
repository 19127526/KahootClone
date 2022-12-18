package com.example.backend.repository;

import com.example.backend.model.entity.SlideEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SlideRepository extends JpaRepository<SlideEntity, Long>, SlidePresentCustom, SlideVoteRepositoryCustom {
    List<SlideEntity> findByPresentation_Id(long presentId);
}
