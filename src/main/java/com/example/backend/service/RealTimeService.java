package com.example.backend.service;

import com.example.backend.model.entity.PresentationEntity;
import com.example.backend.model.entity.SlideEntity;
import com.example.backend.model.request.ChatRequest;
import com.example.backend.model.request.InteractPresentRequest;

public interface RealTimeService {
    void choseVote(InteractPresentRequest interact);

    SlideEntity connect(InteractPresentRequest interact);

    void nextSlide(InteractPresentRequest interact);

    PresentationEntity startPresent(InteractPresentRequest interact);

    void stopPresent(InteractPresentRequest interactPresentRequest);

    void sendMessage(ChatRequest chatRequest);
}
