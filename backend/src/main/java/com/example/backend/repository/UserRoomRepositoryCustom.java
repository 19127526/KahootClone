package com.example.backend.repository;

import com.example.backend.model.entity.UserGroupEntity;

import java.util.List;

public interface UserRoomRepositoryCustom {
    List<UserGroupEntity> fetchDataFromAccountAndRoom(Long userId, Long roomId);
}
