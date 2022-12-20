package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserVoteEntity is a Querydsl query type for UserVoteEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserVoteEntity extends EntityPathBase<UserVoteEntity> {

    private static final long serialVersionUID = 1443719763L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserVoteEntity userVoteEntity = new QUserVoteEntity("userVoteEntity");

    public final com.example.backend.common.model.QSuperEntity _super = new com.example.backend.common.model.QSuperEntity(this);

    public final QUserVoteId id;

    public final QUserEntity users;

    //inherited
    public final NumberPath<Long> version = _super.version;

    public final QVoteEntity vote;

    public QUserVoteEntity(String variable) {
        this(UserVoteEntity.class, forVariable(variable), INITS);
    }

    public QUserVoteEntity(Path<? extends UserVoteEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserVoteEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserVoteEntity(PathMetadata metadata, PathInits inits) {
        this(UserVoteEntity.class, metadata, inits);
    }

    public QUserVoteEntity(Class<? extends UserVoteEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.id = inits.isInitialized("id") ? new QUserVoteId(forProperty("id")) : null;
        this.users = inits.isInitialized("users") ? new QUserEntity(forProperty("users")) : null;
        this.vote = inits.isInitialized("vote") ? new QVoteEntity(forProperty("vote"), inits.get("vote")) : null;
    }

}

