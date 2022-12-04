package com.example.backend.model.entity;

import com.example.backend.common.model.SuperEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "answer")
@NoArgsConstructor
public class AnswerEntity extends SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question")
    private QuestionEntity questionId;
    private String text;
    private int score;

    @OneToMany(mappedBy = "answer")
    private List<UserQuestionEntity> userQuestions = new ArrayList<>();
    public void addUserQuestion(List<UserQuestionEntity> userQuestionEntities) {
        userQuestions.addAll(userQuestionEntities);
        userQuestionEntities.forEach(it -> it.setAnswer(this));
    }
    public void removeUserQuestion(UserQuestionEntity userQuestionEntity) {
        userQuestions.remove(userQuestionEntity);
        userQuestionEntity.setAnswer(null);
    }
}
