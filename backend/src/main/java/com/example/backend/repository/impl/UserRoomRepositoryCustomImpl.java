package com.example.backend.repository.impl;

import com.example.backend.model.entity.UserGroupEntity;
import com.example.backend.repository.UserRoomRepositoryCustom;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserRoomRepositoryCustomImpl implements UserRoomRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public List<UserGroupEntity> fetchDataFromAccountAndRoom(Long userId, Long roomId) {
        return null;
//        return new JPAQueryFactory(entityManager)
//                .from(userRoomEntity)
//                .where(userRoomEntity.room.id.eq(roomId).and(userRoomEntity.user.id.eq(userId)))
//                .select(userRoomEntity).fetch();
    }
}
