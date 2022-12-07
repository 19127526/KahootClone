package com.example.backend.repository.impl;

import com.example.backend.model.entity.GroupEntity;
import com.example.backend.repository.GroupRepositoryCustom;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

import static com.example.backend.model.entity.QGroupEntity.groupEntity;
import static com.example.backend.model.entity.QUserGroupEntity.userGroupEntity;


@Repository
public class GroupRepositoryCustomImpl implements GroupRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Tuple> getGroupDetail(long id) {
        return null;
//        return new JPAQueryFactory(entityManager)
//                .from(groupEntity).where(groupEntity.id.eq(id))
//                .rightJoin(userGroupEntity).on(groupEntity.id.)
//        return new JPAQueryFactory(entityManager)
//                .from(roomEntity).where(roomEntity.name.eq(id))
//                .rightJoin(userRoomEntity).on(roomEntity.id.eq(userRoomEntity.room.id))
//                .innerJoin(accountEntity).on(accountEntity.id.eq(userRoomEntity.user.id))
//                .select(roomEntity,accountEntity,userRoomEntity.score,userRoomEntity.role)
//                .fetch();
    }

    @Override
    public List<GroupEntity> getListRoomJoined(String email) {
        return new JPAQueryFactory(entityManager)
                .from(userGroupEntity).where(userGroupEntity.users.email.eq(email))
                .join(groupEntity).on(groupEntity.id.eq(userGroupEntity.group.id))
                .select(groupEntity)
                .fetch();
    }
}
