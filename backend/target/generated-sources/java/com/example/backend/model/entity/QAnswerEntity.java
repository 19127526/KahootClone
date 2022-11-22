package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAnswerEntity is a Querydsl query type for AnswerEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAnswerEntity extends EntityPathBase<AnswerEntity> {

    private static final long serialVersionUID = 771003580L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAnswerEntity answerEntity = new QAnswerEntity("answerEntity");

    public final com.example.backend.common.model.QSuperEntity _super = new com.example.backend.common.model.QSuperEntity(this);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isCorrect = createBoolean("isCorrect");

    public final QQuestionEntity questionId;

    public final StringPath text = createString("text");

    //inherited
    public final NumberPath<Long> version = _super.version;

    public QAnswerEntity(String variable) {
        this(AnswerEntity.class, forVariable(variable), INITS);
    }

    public QAnswerEntity(Path<? extends AnswerEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAnswerEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAnswerEntity(PathMetadata metadata, PathInits inits) {
        this(AnswerEntity.class, metadata, inits);
    }

    public QAnswerEntity(Class<? extends AnswerEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.questionId = inits.isInitialized("questionId") ? new QQuestionEntity(forProperty("questionId"), inits.get("questionId")) : null;
    }

}

