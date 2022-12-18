package com.example.backend.repository.impl;

import com.example.backend.common.model.Role;
import com.example.backend.model.entity.UserGroupEntity;
import com.example.backend.repository.UserGroupRepositoryCustom;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

import static com.example.backend.model.entity.QGroupEntity.groupEntity;
import static com.example.backend.model.entity.QUserEntity.userEntity;
import static com.example.backend.model.entity.QUserGroupEntity.userGroupEntity;

@Repository
public class UserGroupRepositoryCustomImpl implements UserGroupRepositoryCustom {
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

    @Override
    public Optional<Tuple> getUserAndGroupWithRoles(String email, long groupId, List<Role> roles) {
        return Optional.ofNullable(new JPAQueryFactory(entityManager)
                .from(userEntity)
                .join(userGroupEntity).on(userEntity.id.eq(userGroupEntity.users.id))
                .where(userEntity.email.eq(email).and(userGroupEntity.group.id.eq(groupId)).and(userGroupEntity.role.in(roles)))
                .join(groupEntity).on(userGroupEntity.group.id.eq(groupEntity.id))
                .select(userEntity, groupEntity).fetchOne()
        );
    }
}
