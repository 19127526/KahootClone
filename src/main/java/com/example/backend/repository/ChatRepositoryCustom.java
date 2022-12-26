package com.example.backend.repository;

import com.example.backend.model.entity.ChatEntity;

import java.util.List;

public interface ChatRepositoryCustom {
    List<ChatEntity> getListChatWithSize(long presentId, long size, long offset);
}
