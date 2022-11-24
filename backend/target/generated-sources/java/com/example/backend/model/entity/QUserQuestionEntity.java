package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserQuestionEntity is a Querydsl query type for UserQuestionEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserQuestionEntity extends EntityPathBase<UserQuestionEntity> {

    private static final long serialVersionUID = -447298737L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserQuestionEntity userQuestionEntity = new QUserQuestionEntity("userQuestionEntity");

    public final com.example.backend.common.model.QSuperEntity _super = new com.example.backend.common.model.QSuperEntity(this);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QQuestionEntity questionId;

    public final QRoomEntity roomId;

    public final NumberPath<Integer> scores = createNumber("scores", Integer.class);

    public final QAccountEntity userId;

    //inherited
    public final NumberPath<Long> version = _super.version;

    public QUserQuestionEntity(String variable) {
        this(UserQuestionEntity.class, forVariable(variable), INITS);
    }

    public QUserQuestionEntity(Path<? extends UserQuestionEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserQuestionEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserQuestionEntity(PathMetadata metadata, PathInits inits) {
        this(UserQuestionEntity.class, metadata, inits);
    }

    public QUserQuestionEntity(Class<? extends UserQuestionEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.questionId = inits.isInitialized("questionId") ? new QQuestionEntity(forProperty("questionId"), inits.get("questionId")) : null;
        this.roomId = inits.isInitialized("roomId") ? new QRoomEntity(forProperty("roomId")) : null;
        this.userId = inits.isInitialized("userId") ? new QAccountEntity(forProperty("userId")) : null;
    }

}

