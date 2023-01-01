package com.example.backend.repository.impl;

import com.example.backend.repository.UserVoteRepositoryCustom;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

import static com.example.backend.model.entity.QUserVoteEntity.userVoteEntity;
import static com.example.backend.model.entity.QVoteEntity.voteEntity;

@Repository
public class UserVoteRepositoryCustomImpl implements UserVoteRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Tuple> findVotesAndUserVotes(long slideId, long presentId) {
        return new JPAQueryFactory(entityManager)
                .from(voteEntity)
                .leftJoin(userVoteEntity).on(userVoteEntity.voteId.eq(voteEntity.id))
                .where(userVoteEntity.slideId.eq(slideId).and(userVoteEntity.presentId.eq(presentId)))
                .select(voteEntity, userVoteEntity).fetch();
    }
}
