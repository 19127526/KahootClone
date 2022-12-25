package com.example.backend.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PresentHistoryId implements Serializable {
    @Column(name = "presentationId")
    private long presentationId;
    @Column(name = "userId")
    private long userId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PresentHistoryId that = (PresentHistoryId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(presentationId, that.presentationId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, presentationId);
    }
}
