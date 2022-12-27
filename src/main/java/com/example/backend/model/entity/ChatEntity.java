package com.example.backend.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "chat")
public class ChatEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    private String mess;
    private String sender;

    @Override
    public String toString() {
        return "ChatEntity{" +
                "id=" + id +
                ", mess='" + mess + '\'' +
                ", sender='" + sender + '\'' +
                ", presentId=" + presentId +
                '}';
    }

    private long presentId;
}
