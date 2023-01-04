package com.example.backend.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "questions")
@AllArgsConstructor
@NoArgsConstructor
public class QuestionEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    private long slideId;
    private long presentId;
    private String text;
    private Boolean isAnswer;
    private String email;

    private long createdOn;

    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<LikeQuestionEntity> likes;

    public QuestionEntity(long id, long slideId, long presentId, String text, Boolean isAnswer, String email, List<LikeQuestionEntity> likes) {
        this.id = id;
        this.slideId = slideId;
        this.presentId = presentId;
        this.text = text;
        this.isAnswer = isAnswer;
        this.email = email;
        this.likes = likes;
        this.createdOn = LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }

    public void addLike(LikeQuestionEntity like) {
        this.likes.add(like);
        like.setQuestion(this);
    }

    public void removeLike(LikeQuestionEntity like) {
        this.likes.remove(like);
        like.setQuestion(null);
    }
}
