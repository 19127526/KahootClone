package com.example.backend.repository.impl;

import com.example.backend.repository.SlidePresentCustom;
import com.querydsl.core.Tuple;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class SlidePresentCustomImpl implements SlidePresentCustom {
    @Override
    public Optional<Tuple> getSlideAndPresentation(long slideId, long presentId) {
        return Optional.empty();
    }

    @Override
    public Optional<Tuple> getCurrentSlideAndPresentation(long presentId) {
        return Optional.empty();
    }
}
