package com.example.backend.repository;

import com.example.backend.common.model.Role;
import com.querydsl.core.Tuple;

import java.util.List;

public interface GroupRepositoryCustom {
    /**
     *
     * @param groupId
     * @return USER, ROLE
     */
    List<Tuple> getGroupDetail(long groupId);
//    List<GroupEntity> getListRoomJoined(String email);

    /**
     * @param email
     * @param roles
     * @return tuple with GROUP and OWNER
     */
    List<Tuple> getListGroups(String email, List<Role> roles);

}
