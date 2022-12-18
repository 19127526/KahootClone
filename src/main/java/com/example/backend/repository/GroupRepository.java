package com.example.backend.repository;

import com.example.backend.model.entity.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<GroupEntity, Long>, GroupRepositoryCustom, UserGroupRepositoryCustom {
//    Optional<GroupEntity> findRoomEntityByUrl(String url);
//    Optional<GroupEntity> findRoomEntityByName(String name);
}
