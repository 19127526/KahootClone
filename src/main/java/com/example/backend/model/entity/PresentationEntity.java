package com.example.backend.model.entity;

import com.example.backend.common.model.PresentationStatus;
import com.example.backend.common.model.SuperEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "presentation")
public class PresentationEntity extends SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
//    private String url;
    private PresentationStatus status = PresentationStatus.IDLE;
    private long currentSlide = -1;
    //////////////////
    private long inGroup = -1;
//    private Date created;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private UserEntity author;

    @OneToMany(mappedBy = "presentation", cascade = CascadeType.REMOVE)
    private List<SlideEntity> slides = new ArrayList<>();
    public void addSlide(SlideEntity slide) {
        this.slides.add(slide);
        slide.setPresentation(this);
    }
    public void removeSlide(SlideEntity slide) {
        this.slides.remove(slide);
        slide.setPresentation(null);
    }

    @OneToMany(mappedBy = "presentation", cascade = CascadeType.REMOVE)
    private List<ChatEntity> chat = new ArrayList<>();
    public void addChat(ChatEntity mess) {
        this.chat.add(mess);
        mess.setPresentation(this);
    }

    public void removeChat(ChatEntity mess) {
        this.chat.remove(mess);
        mess.setPresentation(null);
    }
}
