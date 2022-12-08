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
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private QuestionEntity question;

    @OneToMany(mappedBy = "answer", cascade = CascadeType.REMOVE)
    private List<UserAnswerEntity> userAnswers = new ArrayList<>();
    public void addUserAnswers(List<UserAnswerEntity> userQuestionEntities) {
        userAnswers.addAll(userQuestionEntities);
        userQuestionEntities.forEach(it -> it.setAnswer(this));
    }
    public void removeUserAnswer(UserAnswerEntity userAnswerEntity) {
        userAnswers.remove(userAnswerEntity);
        userAnswerEntity.setAnswer(null);
    }
}
