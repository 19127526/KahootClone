package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGroupEntity is a Querydsl query type for GroupEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGroupEntity extends EntityPathBase<GroupEntity> {

    private static final long serialVersionUID = -1780284313L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGroupEntity groupEntity = new QGroupEntity("groupEntity");

    public final com.example.backend.common.model.QSuperEntity _super = new com.example.backend.common.model.QSuperEntity(this);

    public final StringPath code = createString("code");

    public final QUserEntity created;

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final NumberPath<Long> present = createNumber("present", Long.class);

    public final ListPath<UserGroupEntity, QUserGroupEntity> users = this.<UserGroupEntity, QUserGroupEntity>createList("users", UserGroupEntity.class, QUserGroupEntity.class, PathInits.DIRECT2);

    //inherited
    public final NumberPath<Long> version = _super.version;

    public QGroupEntity(String variable) {
        this(GroupEntity.class, forVariable(variable), INITS);
    }

    public QGroupEntity(Path<? extends GroupEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGroupEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGroupEntity(PathMetadata metadata, PathInits inits) {
        this(GroupEntity.class, metadata, inits);
    }

    public QGroupEntity(Class<? extends GroupEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.created = inits.isInitialized("created") ? new QUserEntity(forProperty("created")) : null;
    }

}

