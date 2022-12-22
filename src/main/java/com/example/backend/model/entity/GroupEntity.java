package com.example.backend.model.entity;

import com.example.backend.common.model.Role;
import com.example.backend.common.model.SuperEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

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
@Slf4j
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

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserGroupEntity> userGroups = new ArrayList<>();

    public void addUserGroup(UserEntity user, Role role) {
        UserGroupEntity userGroup = new UserGroupEntity(user, this, role);
        userGroups.add(userGroup);
    }

    public void removeUserGroup(UserEntity user) {
        for (Iterator<UserGroupEntity> iterator = userGroups.iterator(); iterator.hasNext(); ) {
            UserGroupEntity userGroup = iterator.next();
            if (userGroup.getGroup().equals(this) && userGroup.getUsers().equals(user)) {
                iterator.remove();
                userGroup.setGroup(null);
                userGroup.setUsers(null);
            }
        }
    }

    @Override
    public String toString() {
        return "GroupEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", code='" + code + '\'' +
                ", present=" + present;
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
