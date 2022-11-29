package com.example.backend.service;

import com.example.backend.model.entity.AccountEntity;
import com.example.backend.model.entity.RoomEntity;
import com.example.backend.model.request.CreateRoomRequest;
import com.example.backend.model.request.JoinRequest;
import com.example.backend.model.entity.UserRoomEntity;
import com.example.backend.model.request.RemoveRequest;
import com.querydsl.core.Tuple;

import java.util.List;

public interface RoomService {
    UserRoomEntity join(JoinRequest joinRequest);
    RoomEntity createRoom(CreateRoomRequest createRoomRequest);
    AccountEntity removeMember(RemoveRequest removeRequest);
    List<RoomEntity> getListRoomCreated(String email);
    List<RoomEntity> fetchRoomsJoined(String email);
//    UserRoomEntity update(UserRoomDto userRoomDto);
    List<Tuple> getDetail(String name);
}
