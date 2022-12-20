package com.example.backend.model.entity;

import com.example.backend.common.model.Role;
import com.example.backend.common.model.RolePresentation;
import com.example.backend.common.model.SuperEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.NaturalIdCache;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "account")
@NaturalIdCache
public class UserEntity extends SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String userName;
    @NaturalId
    private String email;
    private String password;
    private String imageURL;

    @OneToMany(mappedBy = "created", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<GroupEntity> groupsCreated = new ArrayList<>();
    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
    private List<PresentationEntity> presentationsCreated = new ArrayList<>();
    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserGroupEntity> groups = new ArrayList<>();
    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserPresentationEntity> presentations = new ArrayList<>();

    public void addGroupCreated(GroupEntity group) {
        this.groupsCreated.add(group);
        group.setCreated(this);
    }

    public void removeGroupCreated(GroupEntity group) {
        this.groupsCreated.remove(group);
        group.setCreated(null);
    }

    public void addPresentationCreated(PresentationEntity presentation) {
        this.presentationsCreated.add(presentation);
        presentation.setAuthor(this);
    }

    public void removePresentationCreated(PresentationEntity presentation) {
        this.presentationsCreated.remove(presentation);
        presentation.setAuthor(null);
    }

    public void addGroup(GroupEntity group) {
        UserGroupEntity userGroup = new UserGroupEntity(this, group, Role.OWNER);
        groups.add(userGroup);
        group.getUsers().add(userGroup);
    }

    public void removeGroup(GroupEntity groupEntity) {
        for (Iterator<UserGroupEntity> iterator = groups.iterator(); iterator.hasNext(); ) {
            UserGroupEntity userGroup = iterator.next();
            if (userGroup.getUsers().equals(this) && userGroup.getGroup().equals(groupEntity)) {
                iterator.remove();
                userGroup.getGroup().getUsers().remove(userGroup);
                userGroup.setUsers(null);
                userGroup.setGroup(null);
            }
        }
    }

    public void addPresentation(PresentationEntity presentation) {
        UserPresentationEntity userPresentation = new UserPresentationEntity(this, presentation, RolePresentation.OWNER);
        presentations.add(userPresentation);
        presentation.getUserPresentations().add(userPresentation);
    }

    public void removePresentation(PresentationEntity presentation) {
        for (Iterator<UserPresentationEntity> iterator = presentations.iterator(); iterator.hasNext(); ) {
            UserPresentationEntity userPresentation = iterator.next();
            if (userPresentation.getUsers().equals(this) && userPresentation.getPresentation().equals(presentation)) {
                iterator.remove();
                userPresentation.getPresentation().getUserPresentations().remove(userPresentation);
                userPresentation.setUsers(null);
                userPresentation.setPresentation(null);
            }
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserEntity that = (UserEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
