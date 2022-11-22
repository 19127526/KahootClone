package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QGenreQuestionEntity is a Querydsl query type for GenreQuestionEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGenreQuestionEntity extends EntityPathBase<GenreQuestionEntity> {

    private static final long serialVersionUID = 1707007985L;

    public static final QGenreQuestionEntity genreQuestionEntity = new QGenreQuestionEntity("genreQuestionEntity");

    public final com.example.backend.common.model.QSuperEntity _super = new com.example.backend.common.model.QSuperEntity(this);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    //inherited
    public final NumberPath<Long> version = _super.version;

    public QGenreQuestionEntity(String variable) {
        super(GenreQuestionEntity.class, forVariable(variable));
    }

    public QGenreQuestionEntity(Path<? extends GenreQuestionEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGenreQuestionEntity(PathMetadata metadata) {
        super(GenreQuestionEntity.class, metadata);
    }

}

