package com.example.backend.model.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class UserVoteId implements Serializable {
    @Column(name = "user_id")
    private long userId;
    @Column(name = "vote_id")
    private long voteId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserVoteId that = (UserVoteId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(voteId, that.voteId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId,voteId);
    }
}