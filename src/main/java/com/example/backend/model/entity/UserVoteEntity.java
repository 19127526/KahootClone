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
@Table(name = "user_vote")
@AllArgsConstructor
@NoArgsConstructor
public class UserVoteEntity extends SuperEntity {
    @EmbeddedId
    private UserVoteId id;
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    private UserEntity users;
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("voteId")
    private VoteEntity vote;

    public UserVoteEntity(UserEntity users, VoteEntity vote) {
        this.users = users;
        this.vote = vote;
        this.id = new UserVoteId(users.getId(), vote.getId());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserVoteEntity that = (UserVoteEntity) o;
        return Objects.equals(users, that.users) && Objects.equals(vote, that.vote);
    }

    @Override
    public int hashCode() {
        return Objects.hash(users, vote);
    }
}
