package com.example.backend.service;

import com.example.backend.model.dto.PresentationDto;
import com.example.backend.model.entity.PresentationEntity;
import com.example.backend.model.request.PresentationRequest;

public interface PresentationService {
    void deletePresentation(PresentationRequest presentationRequest);

    PresentationEntity updatePresentation(PresentationDto presentationDto);

    PresentationEntity addPresentation(PresentationRequest presentationRequest);

    PresentationDto getDetail(long id, String email);

    Boolean clearAdvanced(PresentationRequest presentationRequest);

    void inviteCollaborate(PresentationRequest presentationRequest);

    void removeCollaborate(PresentationRequest presentationRequest);

    void acceptPending(PresentationRequest presentationRequest);

    void rejectPending(PresentationRequest presentationRequest);
}
