package com.example.backend.repository;

import com.example.backend.model.entity.UserRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoomRepository extends JpaRepository<UserRoomEntity,Long> {
}
