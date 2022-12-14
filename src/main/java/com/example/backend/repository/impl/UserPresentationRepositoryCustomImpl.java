package com.example.backend.repository.impl;

import com.example.backend.common.model.RolePresentation;
import com.example.backend.repository.PresentationRepository;
import com.example.backend.repository.UserPresentationRepositoryCustom;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

import static com.example.backend.model.entity.QPresentationEntity.presentationEntity;
import static com.example.backend.model.entity.QUserEntity.userEntity;
import static com.example.backend.model.entity.QUserPresentationEntity.userPresentationEntity;

@Repository
public class UserPresentationRepositoryCustomImpl implements UserPresentationRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    public UserPresentationRepositoryCustomImpl(PresentationRepository presentationRepository) {
    }

    @Override
    public Optional<Tuple> getUserAndPresentationWithRole(String email, long presentationId, List<RolePresentation> roles) {
        return Optional.ofNullable(
                new JPAQueryFactory(entityManager)
                        .from(userPresentationEntity)
                        .join(userEntity).on(userEntity.id.eq(userPresentationEntity.users.id))
                        .join(presentationEntity).on(presentationEntity.id.eq(userPresentationEntity.presentation.id))
                        .where(userPresentationEntity.users.email.eq(email).and(userPresentationEntity.presentation.id.eq(presentationId)))
                        .select(userEntity, presentationEntity).fetchOne()
        );
    }

    @Override
    public List<Tuple> getListPresentationsAndOwnerWithRole(String email, List<RolePresentation> roles) {
        return new JPAQueryFactory(entityManager)
                .from(userPresentationEntity)
                .where(userPresentationEntity.users.email.eq(email).and(userPresentationEntity.role.in(roles)))
                .join(presentationEntity).on(presentationEntity.id.eq(userPresentationEntity.presentation.id))
                .join(userEntity).on(userEntity.id.eq(presentationEntity.author.id))
                .select(presentationEntity, userEntity).fetch();
    }

    @Override
    public List<Tuple> getListCollaborationsAndRole(long presentationId, List<RolePresentation> roles) {
        return new JPAQueryFactory(entityManager)
                .from(userPresentationEntity)
                .join(userEntity).on(userPresentationEntity.users.id.eq(userEntity.id))
                .where(userPresentationEntity.presentation.id.eq(presentationId).and(userPresentationEntity.role.in(roles)))
                .select(userEntity, userPresentationEntity.role)
                .fetch();
    }
}
