package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAccountEntity is a Querydsl query type for AccountEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAccountEntity extends EntityPathBase<AccountEntity> {

    private static final long serialVersionUID = 1613097045L;

    public static final QAccountEntity accountEntity = new QAccountEntity("accountEntity");

    public final com.example.backend.common.model.QSuperEntity _super = new com.example.backend.common.model.QSuperEntity(this);

    public final StringPath email = createString("email");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imageUrl = createString("imageUrl");

    public final StringPath password = createString("password");

    public final StringPath userName = createString("userName");

    public final SetPath<UserQuestionEntity, QUserQuestionEntity> userQuestionEntities = this.<UserQuestionEntity, QUserQuestionEntity>createSet("userQuestionEntities", UserQuestionEntity.class, QUserQuestionEntity.class, PathInits.DIRECT2);

    public final SetPath<UserRoomEntity, QUserRoomEntity> userRoomEntities = this.<UserRoomEntity, QUserRoomEntity>createSet("userRoomEntities", UserRoomEntity.class, QUserRoomEntity.class, PathInits.DIRECT2);

    //inherited
    public final NumberPath<Long> version = _super.version;

    public QAccountEntity(String variable) {
        super(AccountEntity.class, forVariable(variable));
    }

    public QAccountEntity(Path<? extends AccountEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAccountEntity(PathMetadata metadata) {
        super(AccountEntity.class, metadata);
    }

}

