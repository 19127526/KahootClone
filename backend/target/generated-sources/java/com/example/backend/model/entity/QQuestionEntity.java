package com.example.backend.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QQuestionEntity is a Querydsl query type for QuestionEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QQuestionEntity extends EntityPathBase<QuestionEntity> {

    private static final long serialVersionUID = 1010032676L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QQuestionEntity questionEntity = new QQuestionEntity("questionEntity");

    public final com.example.backend.common.model.QSuperEntity _super = new com.example.backend.common.model.QSuperEntity(this);

    public final SetPath<AnswerEntity, QAnswerEntity> answer = this.<AnswerEntity, QAnswerEntity>createSet("answer", AnswerEntity.class, QAnswerEntity.class, PathInits.DIRECT2);

    public final EnumPath<com.example.backend.common.model.GenreQuestion> genreQuestion = createEnum("genreQuestion", com.example.backend.common.model.GenreQuestion.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QRoomEntity roomId;

    public final NumberPath<Integer> score = createNumber("score", Integer.class);

    public final StringPath text = createString("text");

    public final SetPath<UserQuestionEntity, QUserQuestionEntity> userQuestionEntitySet = this.<UserQuestionEntity, QUserQuestionEntity>createSet("userQuestionEntitySet", UserQuestionEntity.class, QUserQuestionEntity.class, PathInits.DIRECT2);

    //inherited
    public final NumberPath<Long> version = _super.version;

    public QQuestionEntity(String variable) {
        this(QuestionEntity.class, forVariable(variable), INITS);
    }

    public QQuestionEntity(Path<? extends QuestionEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QQuestionEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QQuestionEntity(PathMetadata metadata, PathInits inits) {
        this(QuestionEntity.class, metadata, inits);
    }

    public QQuestionEntity(Class<? extends QuestionEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.roomId = inits.isInitialized("roomId") ? new QRoomEntity(forProperty("roomId")) : null;
    }

}

