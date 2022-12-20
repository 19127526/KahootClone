package com.example.backend.repository.impl;

import com.example.backend.common.model.Role;
import com.example.backend.repository.GroupRepositoryCustom;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

import static com.example.backend.model.entity.QGroupEntity.groupEntity;
import static com.example.backend.model.entity.QUserEntity.userEntity;
import static com.example.backend.model.entity.QUserGroupEntity.userGroupEntity;


@Repository
public class GroupRepositoryCustomImpl implements GroupRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Tuple> getGroupDetail(long groupId) {
        return new JPAQueryFactory(entityManager)
                .from(userGroupEntity).where(userGroupEntity.group.id.eq(groupId))
                .join(userEntity).on(userEntity.id.eq(userGroupEntity.users.id))
                .select(userEntity, userGroupEntity.role)
                .fetch();
//                .from(groupEntity).on(groupEntity.id.eq(id))
//                .rightJoin(userGroupEntity).on(userGroupEntity.group.id.eq(groupEntity.id))
//                .join(userEntity).on(userGroupEntity.users.id.eq(userEntity.id))
//                .select(groupEntity, userEntity, userGroupEntity.role)
//                .fetch();
    }

    @Override
    public List<Tuple> getListGroups(String email, List<Role> roles) {
        return new JPAQueryFactory(entityManager)
                .from(userGroupEntity)
                .where(userGroupEntity.users.email.eq(email).and(userGroupEntity.role.in(roles)))
                .join(groupEntity).on(groupEntity.id.eq(userGroupEntity.group.id))
                .join(userEntity).on(userEntity.email.eq(groupEntity.created.email))
                .select(groupEntity, userEntity.email)
                .fetch();
    }
}
