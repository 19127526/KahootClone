package com.example.backend.repository;

import com.example.backend.model.entity.AccountEntity;
import com.example.backend.model.entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Long> {
    Optional<RoomEntity> findRoomEntityByUrl(String url);
    Optional<RoomEntity> findRoomEntityByName(String name);

}