package com.example.backend.service;

import com.example.backend.model.dto.GroupDto;
import com.example.backend.model.entity.GroupEntity;
import com.example.backend.model.request.GroupRequest;

import java.util.List;

public interface GroupService {
    GroupEntity join(GroupRequest groupRequest);

    GroupEntity createRoom(GroupRequest groupRequest);

    void removeMember(GroupRequest groupRequest);

    List<GroupDto> getGroupsCreated(String email);

    List<GroupDto> getGroupsJoined(String email);

    GroupDto getDetail(long id, String email);

    void delete(GroupRequest groupRequest);

    void assignRole(GroupRequest groupRequest);
}
