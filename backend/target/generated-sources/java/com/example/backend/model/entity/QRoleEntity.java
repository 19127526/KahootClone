package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QRoleEntity is a Querydsl query type for RoleEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoleEntity extends EntityPathBase<RoleEntity> {

    private static final long serialVersionUID = -99807692L;

    public static final QRoleEntity roleEntity = new QRoleEntity("roleEntity");

    public final com.example.backend.common.model.QSuperEntity _super = new com.example.backend.common.model.QSuperEntity(this);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    //inherited
    public final NumberPath<Long> version = _super.version;

    public QRoleEntity(String variable) {
        super(RoleEntity.class, forVariable(variable));
    }

    public QRoleEntity(Path<? extends RoleEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRoleEntity(PathMetadata metadata) {
        super(RoleEntity.class, metadata);
    }

}

