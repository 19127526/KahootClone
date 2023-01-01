package com.example.backend.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "question")
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

    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<LikeQuestionEntity> likes;

    public void addLike(LikeQuestionEntity like) {
        this.likes.add(like);
        like.setQuestion(this);
    }

    public void removeLike(LikeQuestionEntity like) {
        this.likes.remove(like);
        like.setQuestion(null);
    }
}
