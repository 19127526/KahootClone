package com.example.backend.model.entity;

import com.example.backend.common.model.SuperEntity;
import com.example.backend.common.model.GenreQuestion;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "question")
@NoArgsConstructor
public class QuestionEntity extends SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private GenreQuestion genreQuestion;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room")
    private RoomEntity room;
    private String text;
    private String imageUrl;
    private Integer score;


    @OneToMany(mappedBy = "questionId", cascade = CascadeType.REMOVE)
    private List<AnswerEntity> answers = new ArrayList<>();
    public void addAnswer(AnswerEntity answerEntity) {
        answers.add(answerEntity);
        answerEntity.setQuestionId(this);
    }
    public void removeAnswer(AnswerEntity answerEntity) {
        answers.remove(answerEntity);
        answerEntity.setQuestionId(null);
    }


    @OneToMany(mappedBy = "question")
    private List<UserQuestionEntity> userQuestions = new ArrayList<>();
    public void addUserQuestion(List<UserQuestionEntity> userQuestionEntities) {
        userQuestions.addAll(userQuestionEntities);
        userQuestionEntities.forEach(it -> it.setQuestion(this));
    }
    public void removeUserQuestion(UserQuestionEntity userQuestionEntity) {
        userQuestions.remove(userQuestionEntity);
        userQuestionEntity.setQuestion(null);
    }
}
