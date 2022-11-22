package com.example.backend.service;

import com.example.backend.model.entity.AccountEntity;
import com.example.backend.model.entity.RoomEntity;
import com.example.backend.model.request.CreateRoomRequest;
import com.example.backend.model.request.JoinRequest;
import com.example.backend.model.entity.UserRoomEntity;
import com.example.backend.model.request.RemoveRequest;

public interface RoomService {
    UserRoomEntity addMember(JoinRequest joinRequest);
    RoomEntity createRoom(CreateRoomRequest createRoomRequest);
    AccountEntity removeMember(RemoveRequest removeRequest);
//    UserRoomEntity update(UserRoomDto userRoomDto);
}
