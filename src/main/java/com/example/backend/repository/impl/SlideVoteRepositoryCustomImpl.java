package com.example.backend.repository.impl;

import com.example.backend.repository.SlideVoteRepositoryCustom;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;

import static com.example.backend.model.entity.QSlideEntity.slideEntity;
import static com.example.backend.model.entity.QVoteEntity.voteEntity;

@Repository
public class SlideVoteRepositoryCustomImpl implements SlideVoteRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Tuple> getVoteAndSlideFromVoteId(long voteId) {
        return Optional.ofNullable(new JPAQueryFactory(entityManager)
                .from(voteEntity)
                .join(slideEntity).on(voteEntity.slide.id.eq(slideEntity.id))
                .where(voteEntity.id.eq(voteId))
                .select(voteEntity, slideEntity).fetchOne()
        );
    }
}
