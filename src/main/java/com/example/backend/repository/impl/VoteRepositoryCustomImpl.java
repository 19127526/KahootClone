package com.example.backend.repository.impl;

import com.example.backend.model.entity.VoteEntity;
import com.example.backend.repository.VoteRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

import static com.example.backend.model.entity.QVoteEntity.voteEntity;

@Repository
@RequiredArgsConstructor
public class VoteRepositoryCustomImpl implements VoteRepositoryCustom {
    @PersistenceContext
    private final EntityManager entityManager;
    @Override
    public List<VoteEntity> findVotesExistInListId(List<Long> listId) {
        return new JPAQueryFactory(entityManager)
                .from(voteEntity).where(voteEntity.id.in(listId))
                .select(voteEntity)
                .fetch();
    }
}