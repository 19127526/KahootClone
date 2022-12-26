package com.example.backend.model.entity;

import com.example.backend.common.model.SuperEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "vote_present")
@AllArgsConstructor
@NoArgsConstructor
public class UserVoteEntity extends SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long userId;
    private long voteId;
    private long slideId;
    private long presentId;

    public UserVoteEntity(long userId, long voteId, long slideId, long presentId) {
        this.userId = userId;
        this.voteId = voteId;
        this.slideId = slideId;
        this.presentId = presentId;
    }

    public UserVoteEntity(long voteId, long slideId, long presentId) {
        this.voteId = voteId;
        this.slideId = slideId;
        this.presentId = presentId;
    }
}
