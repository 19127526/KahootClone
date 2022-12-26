package com.example.backend.model.entity;

import com.example.backend.common.model.GenreQuestion;
import com.example.backend.common.model.SuperEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "slide")
@NoArgsConstructor
public class SlideEntity extends SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "params")
    @Lob
    private String text;
    private String heading;
    private GenreQuestion genreQuestion;
    private String imageURL;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private PresentationEntity presentation;

    @OneToMany(mappedBy = "slide", cascade = CascadeType.REMOVE)
    private List<VoteEntity> votes = new ArrayList<>();
    public void addVote(VoteEntity vote) {
        this.votes.add(vote);
        vote.setSlide(this);
    }
    public void removeVote(VoteEntity vote) {
        votes.remove(vote);
        vote.setSlide(null);
    }
}
