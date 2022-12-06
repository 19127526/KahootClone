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

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<UserRoomEntity> userRoom = new ArrayList<>();
    public void addUserRoom(UserRoomEntity userRoomEntity) {
        this.userRoom.add(userRoomEntity);
        userRoomEntity.setUser(this);
    }
    public void removeUserRoom(UserRoomEntity userRoomEntity) {
        this.userRoom.remove(userRoomEntity);
        userRoomEntity.setUser(null);
    }


    @OneToMany(mappedBy = "user")
    private List<UserQuestionEntity> userQuestion = new ArrayList<>();
    public void addUserQuestion(List<UserQuestionEntity> userQuestionEntityList) {
        this.userQuestion.addAll(userQuestionEntityList);
        userQuestion.forEach(it -> it.setUser(this));
    }
    public void removeUserQuestion(UserQuestionEntity userQuestionEntity) {
        this.userQuestion.remove(userQuestionEntity);
        userQuestionEntity.setUser(null);
    }

    @OneToMany(mappedBy = "accountEntity")
    private List<RoomEntity> rooms = new ArrayList<>();
    public void addRoom(RoomEntity roomEntity) {
        this.rooms.add(roomEntity);
        roomEntity.setAccountEntity(this);
    }
    public void removeRoom(RoomEntity roomEntity) {
        this.rooms.remove(roomEntity);
        roomEntity.setAccountEntity(null);
    }
}
