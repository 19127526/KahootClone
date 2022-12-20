package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserEntity is a Querydsl query type for UserEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserEntity extends EntityPathBase<UserEntity> {

    private static final long serialVersionUID = 8644041L;

    public static final QUserEntity userEntity = new QUserEntity("userEntity");

    public final com.example.backend.common.model.QSuperEntity _super = new com.example.backend.common.model.QSuperEntity(this);

    public final StringPath email = createString("email");

    public final ListPath<UserGroupEntity, QUserGroupEntity> groups = this.<UserGroupEntity, QUserGroupEntity>createList("groups", UserGroupEntity.class, QUserGroupEntity.class, PathInits.DIRECT2);

    public final ListPath<GroupEntity, QGroupEntity> groupsCreated = this.<GroupEntity, QGroupEntity>createList("groupsCreated", GroupEntity.class, QGroupEntity.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imageURL = createString("imageURL");

    public final StringPath password = createString("password");

    public final ListPath<PresentationEntity, QPresentationEntity> presentations = this.<PresentationEntity, QPresentationEntity>createList("presentations", PresentationEntity.class, QPresentationEntity.class, PathInits.DIRECT2);

    public final StringPath userName = createString("userName");

    //inherited
    public final NumberPath<Long> version = _super.version;

    public QUserEntity(String variable) {
        super(UserEntity.class, forVariable(variable));
    }

    public QUserEntity(Path<? extends UserEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserEntity(PathMetadata metadata) {
        super(UserEntity.class, metadata);
    }

}

