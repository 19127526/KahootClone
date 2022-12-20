package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserGroupEntity is a Querydsl query type for UserGroupEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserGroupEntity extends EntityPathBase<UserGroupEntity> {

    private static final long serialVersionUID = -1002968804L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserGroupEntity userGroupEntity = new QUserGroupEntity("userGroupEntity");

    public final com.example.backend.common.model.QSuperEntity _super = new com.example.backend.common.model.QSuperEntity(this);

    public final QGroupEntity group;

    public final QUserGroupId id;

    public final DatePath<java.sql.Date> joinOn = createDate("joinOn", java.sql.Date.class);

    public final EnumPath<com.example.backend.common.model.Role> role = createEnum("role", com.example.backend.common.model.Role.class);

    public final QUserEntity users;

    //inherited
    public final NumberPath<Long> version = _super.version;

    public QUserGroupEntity(String variable) {
        this(UserGroupEntity.class, forVariable(variable), INITS);
    }

    public QUserGroupEntity(Path<? extends UserGroupEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserGroupEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserGroupEntity(PathMetadata metadata, PathInits inits) {
        this(UserGroupEntity.class, metadata, inits);
    }

    public QUserGroupEntity(Class<? extends UserGroupEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.group = inits.isInitialized("group") ? new QGroupEntity(forProperty("group"), inits.get("group")) : null;
        this.id = inits.isInitialized("id") ? new QUserGroupId(forProperty("id")) : null;
        this.users = inits.isInitialized("users") ? new QUserEntity(forProperty("users")) : null;
    }

}

