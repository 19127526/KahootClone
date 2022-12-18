package com.example.backend.model.entity;

import com.example.backend.common.model.Role;
import com.example.backend.common.model.SuperEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_in_room")
public class UserGroupEntity extends SuperEntity {
    @EmbeddedId
    private UserGroupId id;
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("groupId")
    private GroupEntity group;
    @Column(name = "join_on")
    private Date joinOn = new Date(System.currentTimeMillis());
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    private UserEntity users;
    private Role role;

    public UserGroupEntity(UserEntity users, GroupEntity group, Role role) {
        this.users = users;
        this.group = group;
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserGroupEntity that = (UserGroupEntity) o;
        return Objects.equals(group, that.group) && Objects.equals(users, that.users);
    }

    @Override
    public int hashCode() {
        return Objects.hash(group, users);
    }
}
