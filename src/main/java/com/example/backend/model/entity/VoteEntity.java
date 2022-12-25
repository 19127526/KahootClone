package com.example.backend.model.entity;

import com.example.backend.common.model.SuperEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "answer")
@NoArgsConstructor
public class VoteEntity extends SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private SlideEntity slide;

//    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<UserVoteEntity> users = new ArrayList<>();
//
//    public void addUser(UserEntity user) {
//        UserVoteEntity userVote = new UserVoteEntity(user, this);
//        users.add(userVote);
//    }
//
//    public void removeUser(UserEntity user) {
//        for (Iterator<UserVoteEntity> iterator = users.iterator(); iterator.hasNext(); ) {
//            UserVoteEntity userVote = iterator.next();
//            if (userVote.getVote().equals(this) && userVote.getUsers().equals(user)) {
//                iterator.remove();
//                userVote.setVote(null);
//                userVote.setUsers(null);
//            }
//        }
//    }

//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        VoteEntity that = (VoteEntity) o;
//        return Objects.equals(id, that.id);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(id);
//    }
}
