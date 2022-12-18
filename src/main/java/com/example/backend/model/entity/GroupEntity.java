package com.example.backend.model.entity;

import com.example.backend.common.model.Role;
import com.example.backend.common.model.SuperEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "room")
public class GroupEntity extends SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;
    private String code;
    /////////////////////
    private long present = -1;
    @ManyToOne(fetch = FetchType.LAZY)
    private UserEntity created;

    @OneToMany(mappedBy = "group", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<UserGroupEntity> users = new ArrayList<>();

    public void addUser(UserEntity user) {
        UserGroupEntity userGroup = new UserGroupEntity(user, this, Role.MEMBER);
        users.add(userGroup);
        user.getGroups().add(userGroup);
    }

    public void removeUserGroup(UserEntity user) {
        for (Iterator<UserGroupEntity> iterator = users.iterator(); iterator.hasNext(); ) {
            UserGroupEntity userGroup = iterator.next();

            if (userGroup.getGroup().equals(this) && userGroup.getUsers().equals(user)) {
                iterator.remove();
                userGroup.getUsers().getGroups().remove(userGroup);
                userGroup.setGroup(null);
                userGroup.setUsers(null);
            }
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        return Objects.equals(id, ((GroupEntity) o).id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
