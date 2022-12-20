package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUserVoteId is a Querydsl query type for UserVoteId
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QUserVoteId extends BeanPath<UserVoteId> {

    private static final long serialVersionUID = 496257931L;

    public static final QUserVoteId userVoteId = new QUserVoteId("userVoteId");

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public final NumberPath<Long> voteId = createNumber("voteId", Long.class);

    public QUserVoteId(String variable) {
        super(UserVoteId.class, forVariable(variable));
    }

    public QUserVoteId(Path<? extends UserVoteId> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserVoteId(PathMetadata metadata) {
        super(UserVoteId.class, metadata);
    }

}

