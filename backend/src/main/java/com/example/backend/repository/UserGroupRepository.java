package com.example.backend.repository;

import com.example.backend.model.entity.UserGroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserGroupRepository extends JpaRepository<UserGroupEntity,Long>, UserRoomRepositoryCustom {
    Optional<UserGroupEntity> findUserRoomEntityByUsers_IdAndGroup_Id(Long user, Long group);
}
