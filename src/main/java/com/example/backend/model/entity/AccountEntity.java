package com.example.backend.model.entity;

import com.example.backend.common.model.SuperEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "account")
public class AccountEntity extends SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String userName;
    @Column(unique = true)
    private String email;
    private String password;
    private String imageURL;

    @OneToMany(mappedBy = "users", cascade = CascadeType.REMOVE)
    private List<UserGroupEntity> userGroup = new ArrayList<>();
    public void addUserGroup(UserGroupEntity userGroupEntity) {
        this.userGroup.add(userGroupEntity);
        userGroupEntity.setUsers(this);
    }
    public void removeUserGroup(UserGroupEntity userGroupEntity) {
        this.userGroup.remove(userGroupEntity);
        userGroupEntity.setUsers(null);
    }

    @OneToMany(mappedBy = "created", cascade = CascadeType.REMOVE)
    private List<GroupEntity> groups = new ArrayList<>();
    public void addGroup(GroupEntity groupEntity) {
        this.groups.add(groupEntity);
        groupEntity.setCreated(this);
    }
    public void removeGroup(GroupEntity groupEntity) {
        this.groups.remove(groupEntity);
        groupEntity.setCreated(null);
    }

    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
    private List<PresentationEntity> presentations = new ArrayList<>();
    public void addPresentation(PresentationEntity presentation){
        this.presentations.add(presentation);
        presentation.setAuthor(this);
    }
    public void removePresentation(PresentationEntity presentation) {
        this.presentations.remove(presentation);
        presentation.setAuthor(null);
    }
}
