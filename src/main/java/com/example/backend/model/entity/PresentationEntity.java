package com.example.backend.model.entity;

import com.example.backend.common.model.RolePresentation;
import com.example.backend.common.model.SuperEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

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
//    private PresentationStatus status = PresentationStatus.IDLE;
//    private long currentSlide = -1;
    //////////////////
//    private long inGroup = -1;
//    private Date created;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private UserEntity author;

    @OneToMany(mappedBy = "presentation", cascade = CascadeType.REMOVE)
    private List<SlideEntity> slides = new ArrayList<>();
    @OneToMany(mappedBy = "presentation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserPresentationEntity> userPresentations = new ArrayList<>();

//    @OneToMany(mappedBy = "presentation", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<PresentHistoryEntity> presentHistories = new ArrayList<>();

    public void addSlide(SlideEntity slide) {
        this.slides.add(slide);
        slide.setPresentation(this);
    }

    public void removeSlide(SlideEntity slide) {
        this.slides.remove(slide);
        slide.setPresentation(null);
    }

    public void addCollaborate(UserEntity user, RolePresentation role) {
        UserPresentationEntity userPresentation = new UserPresentationEntity(user, this, role);
        userPresentations.add(userPresentation);
    }

    public void removeCollaborate(UserEntity user) {
        for (Iterator<UserPresentationEntity> iterator = userPresentations.iterator(); iterator.hasNext(); ) {
            UserPresentationEntity userPresentation = iterator.next();
            if (userPresentation.getPresentation().equals(this) && userPresentation.getUsers().equals(user)) {
                iterator.remove();
                userPresentation.setPresentation(null);
                userPresentation.setUsers(null);
            }
        }
    }

//    public void addPresentHistory(UserEntity user, Long groupId, long slideId) {
//        PresentHistoryEntity presentHistory = new PresentHistoryEntity(user, this, groupId, slideId);
//        presentHistories.add(presentHistory);
//    }
//
//    public void removePresentHistory(UserEntity user) {
//        for (Iterator<PresentHistoryEntity> iterator = presentHistories.iterator(); iterator.hasNext(); ) {
//            PresentHistoryEntity presentHistory = iterator.next();
//            if (presentHistory.getPresentationId().equals(this) && presentHistory.getUserId().equals(user)) {
//                iterator.remove();
//                presentHistory.setPresentationId(null);
//                presentHistory.setUserId(null);
//            }
//        }
//    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PresentationEntity that = (PresentationEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
