package com.example.backend.model.entity;

import com.example.backend.common.model.RolePresentation;
import com.example.backend.common.model.SuperEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user_in_presentation")
public class UserPresentationEntity extends SuperEntity {
    @EmbeddedId
    private UserPresentationId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("presentationId")
    private PresentationEntity presentation;
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    private UserEntity users;
    private RolePresentation role;

    public UserPresentationEntity(UserEntity user, PresentationEntity presentation, RolePresentation role) {
        this.users = user;
        this.presentation = presentation;
        this.role = role;
        this.id = new UserPresentationId(user.getId(), presentation.getId());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if(o == null || getClass() != o.getClass()) return false;
        UserPresentationEntity that = (UserPresentationEntity) o;
        return Objects.equals(users, that.users) && Objects.equals(presentation, that.presentation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(presentation, users);
    }
}
