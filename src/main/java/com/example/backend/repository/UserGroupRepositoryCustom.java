package com.example.backend.repository;

import com.example.backend.common.model.Role;
import com.example.backend.model.entity.UserEntity;
import com.example.backend.model.entity.UserGroupEntity;
import com.querydsl.core.Tuple;

import java.util.List;
import java.util.Optional;

public interface UserGroupRepositoryCustom {
    /**
     * check user exist in group with passed Role
     * @param email
     * @param groupId
     * @return USER,GROUP
     */
    Optional<Tuple> getUserAndGroupWithRoles(String email, long groupId, List<Role> roles);

    List<UserEntity> getListUserWithGroup(long groupId);
}
