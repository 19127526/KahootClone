package com.example.backend.model.entity;

import com.example.backend.common.model.SuperEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    @Column(unique = true)
    private String name;
    private String description;
    private String url;
    private String code;
    @ManyToOne
    private AccountEntity created;


    @OneToMany(mappedBy = "group", cascade = CascadeType.REMOVE)
    private List<PresentationEntity> presentations = new ArrayList<>();
    public void addPresentation(PresentationEntity presentation) {
        this.presentations.add(presentation);
        presentation.setGroup(this);
    }
    public void removePresentation(PresentationEntity presentation) {
        this.presentations.remove(presentation);
        presentation.setGroup(null);
    }

    @OneToMany(mappedBy = "group", cascade = CascadeType.REMOVE)
    private List<UserGroupEntity> userGroup = new ArrayList<>();
    public void addUserGroup(UserGroupEntity userGroupEntity) {
        this.userGroup.add(userGroupEntity);
        userGroupEntity.setGroup(this);
    }
    public void removeUserGroup(UserGroupEntity userGroupEntity) {
        this.userGroup.remove(userGroupEntity);
        userGroupEntity.setGroup(null);
    }
}
