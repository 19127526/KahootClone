package com.example.backend.model.entity;

import com.example.backend.common.model.SuperEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "user_question")
@NoArgsConstructor
public class UserAnswerEntity extends SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long question;
    private String userr;
    @ManyToOne(fetch = FetchType.LAZY)
    private AnswerEntity answer;
}
