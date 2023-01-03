package com.example.backend.service;

import com.example.backend.model.dto.*;
import com.example.backend.model.entity.PresentationEntity;
import com.example.backend.model.request.PresentationRequest;

import java.util.List;

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

    List<PresentationDto> getListJoin(String email);

    List<PresentationDto> getListPending(String email);

    List<PresentHistoryDto> getListHistoryPresents(long id);

    SlideDto getListHistorySlide(long historyPresentId, long slideId);

    List<QuestionDto> getListQuestions(long presentId);

    List<UserPresentationDto> getListCollab(long presentationId);
}
