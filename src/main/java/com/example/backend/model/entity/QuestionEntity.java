package com.example.backend.model.entity;

import com.example.backend.common.model.SuperEntity;
import com.example.backend.common.model.GenreQuestion;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    private String text;
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private PresentationEntity presentation;

    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<AnswerEntity> answers = new ArrayList<>();
    public void addAnswer(AnswerEntity answer) {
        this.answers.add(answer);
        answer.setQuestion(this);
    }
    public void removeAnswer(AnswerEntity answerEntity) {
        answers.remove(answerEntity);
        answerEntity.setQuestion(null);
    }
}
