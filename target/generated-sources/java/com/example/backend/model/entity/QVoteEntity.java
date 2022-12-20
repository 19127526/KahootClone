package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QVoteEntity is a Querydsl query type for VoteEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QVoteEntity extends EntityPathBase<VoteEntity> {

    private static final long serialVersionUID = 171719080L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QVoteEntity voteEntity = new QVoteEntity("voteEntity");

    public final com.example.backend.common.model.QSuperEntity _super = new com.example.backend.common.model.QSuperEntity(this);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QSlideEntity slide;

    public final StringPath text = createString("text");

    public final ListPath<UserVoteEntity, QUserVoteEntity> users = this.<UserVoteEntity, QUserVoteEntity>createList("users", UserVoteEntity.class, QUserVoteEntity.class, PathInits.DIRECT2);

    //inherited
    public final NumberPath<Long> version = _super.version;

    public QVoteEntity(String variable) {
        this(VoteEntity.class, forVariable(variable), INITS);
    }

    public QVoteEntity(Path<? extends VoteEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QVoteEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QVoteEntity(PathMetadata metadata, PathInits inits) {
        this(VoteEntity.class, metadata, inits);
    }

    public QVoteEntity(Class<? extends VoteEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.slide = inits.isInitialized("slide") ? new QSlideEntity(forProperty("slide"), inits.get("slide")) : null;
    }

}

