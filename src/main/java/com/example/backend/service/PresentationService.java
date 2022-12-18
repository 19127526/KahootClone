package com.example.backend.service;

import com.example.backend.model.dto.PresentationDto;
import com.example.backend.model.entity.PresentationEntity;
import com.example.backend.model.request.PresentationRequest;

public interface PresentationService {
    void deletePresentation(PresentationRequest presentationRequest);

    PresentationEntity updatePresentation(PresentationDto presentationDto);

    PresentationEntity addPresentation(PresentationRequest presentationRequest);

    PresentationDto getDetail(PresentationRequest presentationRequest);

    Boolean clearAdvanced(PresentationRequest presentationRequest);
}
