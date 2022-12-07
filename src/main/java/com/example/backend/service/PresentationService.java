package com.example.backend.service;

import com.example.backend.model.dto.PresentationDto;
import com.example.backend.model.entity.PresentationEntity;
import com.example.backend.model.request.CreatePresentationRequest;
import com.example.backend.model.request.PresentRequest;

import java.util.List;

public interface PresentationService {
    void deletePresentation(PresentationDto presentationDto);

    PresentationEntity updatePresentation(PresentationDto presentationDto);

    PresentationEntity addPresentation(CreatePresentationRequest createPresentationRequest);

    List<PresentationEntity> getList(long id, boolean isPublic);

    PresentationEntity getDetail(long id);

    PresentationEntity startPresent(PresentRequest presentRequest);

    PresentationEntity stopPresent(PresentRequest presentRequest);
}
