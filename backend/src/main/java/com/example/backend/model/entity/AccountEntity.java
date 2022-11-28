package com.example.backend.model.entity;

import com.example.backend.common.model.SuperEntity;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "account")
public class AccountEntity extends SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userName;
    @Column(unique = true)
    private String email;
    private String imageURL;

    @OneToMany(mappedBy = "userId", cascade = CascadeType.REMOVE)
    private Set<UserRoomEntity> userRoomEntities = new HashSet<>();
    public void addUserRoom(UserRoomEntity userRoomEntity) {
        this.userRoomEntities.add(userRoomEntity);
        userRoomEntity.setUserId(this);
    }
    public void removeUserRoom(UserRoomEntity userRoomEntity) {
        this.userRoomEntities.remove(userRoomEntity);
        userRoomEntity.setUserId(null);
    }


    @OneToMany(mappedBy = "userId")
    private Set<UserQuestionEntity> userQuestionEntities = new HashSet<>();
    public void addUserQuestion(List<UserQuestionEntity> userQuestionEntityList) {
        this.userQuestionEntities.addAll(userQuestionEntityList);
        userQuestionEntities.forEach(it -> it.setUserId(this));
    }
    public void removeUserQuestion(UserQuestionEntity userQuestionEntity) {
        this.userQuestionEntities.remove(userQuestionEntity);
        userQuestionEntity.setUserId(null);
    }

    @OneToMany(mappedBy = "accountEntity")
    private Set<RoomEntity> roomEntities = new HashSet<>();
    public void addRoomEntity(RoomEntity roomEntity) {
        this.roomEntities.add(roomEntity);
        roomEntity.setAccountEntity(this);
    }
    public void removeRoomEntity(RoomEntity roomEntity) {
        this.roomEntities.remove(roomEntity);
        roomEntity.setAccountEntity(null);
    }
}
