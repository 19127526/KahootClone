package com.example.backend.repository;

import com.example.backend.model.entity.SlideEntity;
import com.querydsl.core.Tuple;

import java.util.Optional;

public interface SlidePresentCustom {
    Optional<Tuple> getSlideAndPresentation(long slideId, long presentId);
    Optional<Tuple> getCurrentSlideAndPresentation(long presentId);
}
