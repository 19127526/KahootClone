package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSlideEntity is a Querydsl query type for SlideEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSlideEntity extends EntityPathBase<SlideEntity> {

    private static final long serialVersionUID = 829398553L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSlideEntity slideEntity = new QSlideEntity("slideEntity");

    public final com.example.backend.common.model.QSuperEntity _super = new com.example.backend.common.model.QSuperEntity(this);

    public final EnumPath<com.example.backend.common.model.GenreQuestion> genreQuestion = createEnum("genreQuestion", com.example.backend.common.model.GenreQuestion.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imageURL = createString("imageURL");

    public final QPresentationEntity presentation;

    public final StringPath text = createString("text");

    //inherited
    public final NumberPath<Long> version = _super.version;

    public final ListPath<VoteEntity, QVoteEntity> votes = this.<VoteEntity, QVoteEntity>createList("votes", VoteEntity.class, QVoteEntity.class, PathInits.DIRECT2);

    public QSlideEntity(String variable) {
        this(SlideEntity.class, forVariable(variable), INITS);
    }

    public QSlideEntity(Path<? extends SlideEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSlideEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSlideEntity(PathMetadata metadata, PathInits inits) {
        this(SlideEntity.class, metadata, inits);
    }

    public QSlideEntity(Class<? extends SlideEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.presentation = inits.isInitialized("presentation") ? new QPresentationEntity(forProperty("presentation"), inits.get("presentation")) : null;
    }

}

