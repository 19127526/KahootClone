package com.example.backend.repository;

import com.example.backend.model.entity.UserEntity;

import java.util.Optional;

public interface UserRepositoryCustom {
    /**
     * find USER from group with email and group
     * @param email
     * @param groupId
     * @return USER
     */
    Optional<UserEntity> findUserFromGroup(String email, long groupId);
}
