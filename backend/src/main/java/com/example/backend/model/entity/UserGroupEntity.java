package com.example.backend.model.entity;

import com.example.backend.common.model.SuperEntity;
import com.example.backend.common.model.Role;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "user_in_room")
public class UserGroupEntity extends SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_room")
    private AccountEntity users;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private GroupEntity group;
    private Role role;
//    private Integer score = 0;
}
