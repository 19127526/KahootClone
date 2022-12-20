package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUserGroupId is a Querydsl query type for UserGroupId
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QUserGroupId extends BeanPath<UserGroupId> {

    private static final long serialVersionUID = -2141743404L;

    public static final QUserGroupId userGroupId = new QUserGroupId("userGroupId");

    public final NumberPath<Long> groupId = createNumber("groupId", Long.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QUserGroupId(String variable) {
        super(UserGroupId.class, forVariable(variable));
    }

    public QUserGroupId(Path<? extends UserGroupId> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserGroupId(PathMetadata metadata) {
        super(UserGroupId.class, metadata);
    }

}

