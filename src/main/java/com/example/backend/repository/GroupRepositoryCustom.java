package com.example.backend.repository;

import com.example.backend.model.entity.GroupEntity;
import com.querydsl.core.Tuple;

import java.util.List;

public interface GroupRepositoryCustom {
    List<Tuple> getGroupDetail(long id);
    List<GroupEntity> getListRoomJoined(String email);

}
