package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoomEntity is a Querydsl query type for RoomEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoomEntity extends EntityPathBase<RoomEntity> {

    private static final long serialVersionUID = -656249127L;

    public static final QRoomEntity roomEntity = new QRoomEntity("roomEntity");

    public final com.example.backend.common.model.QSuperEntity _super = new com.example.backend.common.model.QSuperEntity(this);

    public final NumberPath<Integer> capacity = createNumber("capacity", Integer.class);

    public final StringPath code = createString("code");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final SetPath<QuestionEntity, QQuestionEntity> questionEntitySet = this.<QuestionEntity, QQuestionEntity>createSet("questionEntitySet", QuestionEntity.class, QQuestionEntity.class, PathInits.DIRECT2);

    public final EnumPath<com.example.backend.common.model.GenreRoom> type = createEnum("type", com.example.backend.common.model.GenreRoom.class);

    public final StringPath url = createString("url");

    public final SetPath<UserQuestionEntity, QUserQuestionEntity> userQuestionEntities = this.<UserQuestionEntity, QUserQuestionEntity>createSet("userQuestionEntities", UserQuestionEntity.class, QUserQuestionEntity.class, PathInits.DIRECT2);

    public final SetPath<UserRoomEntity, QUserRoomEntity> userRoomEntities = this.<UserRoomEntity, QUserRoomEntity>createSet("userRoomEntities", UserRoomEntity.class, QUserRoomEntity.class, PathInits.DIRECT2);

    //inherited
    public final NumberPath<Long> version = _super.version;

    public QRoomEntity(String variable) {
        super(RoomEntity.class, forVariable(variable));
    }

    public QRoomEntity(Path<? extends RoomEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRoomEntity(PathMetadata metadata) {
        super(RoomEntity.class, metadata);
    }

}

