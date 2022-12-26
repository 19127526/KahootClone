package com.example.backend.service;

import com.example.backend.model.dto.PresentDto;
import com.example.backend.model.entity.ChatEntity;
import com.example.backend.model.request.ChatRequest;
import com.example.backend.model.request.InteractPresentRequest;

import java.util.List;

public interface RealTimeService {
    void choseVote(InteractPresentRequest interact);

    PresentDto connect(InteractPresentRequest interact);

    void changeSlide(InteractPresentRequest interact);

    PresentDto startPresent(InteractPresentRequest interact);

    void stopPresent(InteractPresentRequest interactPresentRequest);

    void sendMessage(ChatRequest chatRequest);

    List<ChatEntity> getChat(long presentId, long size, long offset);
}
