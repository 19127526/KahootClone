package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserRoomEntity is a Querydsl query type for UserRoomEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserRoomEntity extends EntityPathBase<UserRoomEntity> {

    private static final long serialVersionUID = 615751556L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserRoomEntity userRoomEntity = new QUserRoomEntity("userRoomEntity");

    public final com.example.backend.common.model.QSuperEntity _super = new com.example.backend.common.model.QSuperEntity(this);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final EnumPath<com.example.backend.common.model.Role> role = createEnum("role", com.example.backend.common.model.Role.class);

    public final QRoomEntity roomId;

    public final NumberPath<Integer> score = createNumber("score", Integer.class);

    public final QAccountEntity userId;

    //inherited
    public final NumberPath<Long> version = _super.version;

    public QUserRoomEntity(String variable) {
        this(UserRoomEntity.class, forVariable(variable), INITS);
    }

    public QUserRoomEntity(Path<? extends UserRoomEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserRoomEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserRoomEntity(PathMetadata metadata, PathInits inits) {
        this(UserRoomEntity.class, metadata, inits);
    }

    public QUserRoomEntity(Class<? extends UserRoomEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.roomId = inits.isInitialized("roomId") ? new QRoomEntity(forProperty("roomId")) : null;
        this.userId = inits.isInitialized("userId") ? new QAccountEntity(forProperty("userId")) : null;
    }

}

