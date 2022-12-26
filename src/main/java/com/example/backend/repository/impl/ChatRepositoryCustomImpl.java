package com.example.backend.repository.impl;

import com.example.backend.model.entity.ChatEntity;
import com.example.backend.repository.ChatRepositoryCustom;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

import static com.example.backend.model.entity.QChatEntity.chatEntity;

@Repository
public class ChatRepositoryCustomImpl implements ChatRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<ChatEntity> getListChatWithSize(long presentId, long size) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<ChatEntity> cq = cb.createQuery(ChatEntity.class);
        Root<ChatEntity> chat = cq.from(ChatEntity.class);
//        return new JPAQueryFactory(entityManager)
//                .from(chatEntity).where(chatEntity.presentId.eq(presentId))
//                .orderBy(Sort.Order.by("presentId").getDirection().isDescending())
//                .fetchAll(Sort.by(Sort.Direction.DESC, "id"));
        return null;
    }
}
