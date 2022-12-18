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
    @JoinColumn
    @ManyToOne(fetch = FetchType.LAZY)
    private PresentationEntity presentation;
}
