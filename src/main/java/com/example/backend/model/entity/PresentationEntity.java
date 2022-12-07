package com.example.backend.model.entity;

import com.example.backend.common.model.SuperEntity;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "presentation")
public class PresentationEntity extends SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String url;
//    private Date created;
    private String type;
    private Boolean isPublic = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private GroupEntity group;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private AccountEntity author;

    @OneToMany(mappedBy = "presentation")
    private List<QuestionEntity> questions = new ArrayList<>();
    public void addQuestion(QuestionEntity question) {
        this.questions.add(question);
        question.setPresentation(this);
    }
    public void removeQuestion(QuestionEntity question) {
        this.questions.remove(question);
        question.setPresentation(null);
    }
}
