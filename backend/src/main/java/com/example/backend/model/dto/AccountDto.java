package com.example.backend.model.dto;

import com.example.backend.model.entity.UserQuestionEntity;
import com.example.backend.model.entity.UserRoomEntity;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class AccountDto {
    private String userName;
    private String email;
    private String password;
    private Set<UserRoomEntity> userRoomEntities = new HashSet<>();
    private Set<UserQuestionEntity> userQuestionEntities = new HashSet<>();
}
