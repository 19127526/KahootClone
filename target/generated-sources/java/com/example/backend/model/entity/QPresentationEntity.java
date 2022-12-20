package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPresentationEntity is a Querydsl query type for PresentationEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPresentationEntity extends EntityPathBase<PresentationEntity> {

    private static final long serialVersionUID = 851547864L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPresentationEntity presentationEntity = new QPresentationEntity("presentationEntity");

    public final com.example.backend.common.model.QSuperEntity _super = new com.example.backend.common.model.QSuperEntity(this);

    public final QUserEntity author;

    public final ListPath<ChatEntity, QChatEntity> chat = this.<ChatEntity, QChatEntity>createList("chat", ChatEntity.class, QChatEntity.class, PathInits.DIRECT2);

    public final NumberPath<Long> currentSlide = createNumber("currentSlide", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> inGroup = createNumber("inGroup", Long.class);

    public final StringPath name = createString("name");

    public final ListPath<SlideEntity, QSlideEntity> slides = this.<SlideEntity, QSlideEntity>createList("slides", SlideEntity.class, QSlideEntity.class, PathInits.DIRECT2);

    public final EnumPath<com.example.backend.common.model.PresentationStatus> status = createEnum("status", com.example.backend.common.model.PresentationStatus.class);

    //inherited
    public final NumberPath<Long> version = _super.version;

    public QPresentationEntity(String variable) {
        this(PresentationEntity.class, forVariable(variable), INITS);
    }

    public QPresentationEntity(Path<? extends PresentationEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPresentationEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPresentationEntity(PathMetadata metadata, PathInits inits) {
        this(PresentationEntity.class, metadata, inits);
    }

    public QPresentationEntity(Class<? extends PresentationEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.author = inits.isInitialized("author") ? new QUserEntity(forProperty("author")) : null;
    }

}

