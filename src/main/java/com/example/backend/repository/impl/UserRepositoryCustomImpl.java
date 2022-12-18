package com.example.backend.repository.impl;

import com.example.backend.model.entity.UserEntity;
import com.example.backend.repository.UserRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;

import static com.example.backend.model.entity.QUserEntity.userEntity;
import static com.example.backend.model.entity.QUserGroupEntity.userGroupEntity;

@Repository
public class UserRepositoryCustomImpl implements UserRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<UserEntity> findUserFromGroup(String email, long groupId) {
        return Optional.ofNullable(new JPAQueryFactory(entityManager)
                        .from(userEntity)
                        .join(userGroupEntity).on(userEntity.id.eq(userGroupEntity.users.id))
                        .where(userEntity.email.eq(email).and(userGroupEntity.group.id.eq(groupId)))
                        .select(userEntity).fetchOne());
    }
}
