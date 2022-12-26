package com.example.backend.repository.impl;

import com.example.backend.model.entity.ChatEntity;
import com.example.backend.repository.ChatRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

import static com.example.backend.model.entity.QChatEntity.chatEntity;

@Repository
public class ChatRepositoryCustomImpl implements ChatRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<ChatEntity> getListChatWithSize(long presentId, long size, long offset) {
        return new JPAQueryFactory(entityManager).selectFrom(chatEntity).orderBy(chatEntity.id.desc()).where(chatEntity.presentId.eq(presentId)).limit(size).offset(offset).fetch();
    }
}
