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
public class UserPresentationId implements Serializable {
    @Column(name = "user_id")
    private long userId;

    @Column(name = "group_id")
    private long presentationId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPresentationId that = (UserPresentationId) o;
        return Objects.equals(userId,that.userId) && Objects.equals(presentationId, that.presentationId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, presentationId);
    }
}
