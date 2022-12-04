package com.example.backend.model.entity;

import com.example.backend.common.model.SuperEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "user_question")
@NoArgsConstructor
public class UserQuestionEntity extends SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Integer score;
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "room")
//    private RoomEntity roomId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question")
    private QuestionEntity question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_question")
    private AccountEntity user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "answer")
    private AnswerEntity answer;
}
