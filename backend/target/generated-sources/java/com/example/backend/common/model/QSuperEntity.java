package com.example.backend.common.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QSuperEntity is a Querydsl query type for SuperEntity
 */
@Generated("com.querydsl.codegen.DefaultSupertypeSerializer")
public class QSuperEntity extends EntityPathBase<SuperEntity> {

    private static final long serialVersionUID = 1217751681L;

    public static final QSuperEntity superEntity = new QSuperEntity("superEntity");

    public final NumberPath<Long> version = createNumber("version", Long.class);

    public QSuperEntity(String variable) {
        super(SuperEntity.class, forVariable(variable));
    }

    public QSuperEntity(Path<? extends SuperEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSuperEntity(PathMetadata metadata) {
        super(SuperEntity.class, metadata);
    }

}

