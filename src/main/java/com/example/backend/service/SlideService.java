package com.example.backend.service;

import com.example.backend.model.dto.SlideDto;
import com.example.backend.model.entity.SlideEntity;

public interface SlideService {
    void deleteSlide(SlideDto slideDto);

    SlideEntity createSlide(SlideDto slideDto);

    SlideEntity updateSlide(SlideDto slideDto);

    SlideDto detailSlide(long id);
}
