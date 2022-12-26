package com.example.backend.model.entity;

import com.example.backend.common.model.PresentationStatus;
import com.example.backend.common.model.SuperEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "presentation_history")
public class PresentHistoryEntity extends SuperEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;
    private long presentationId;
    private long userId;

    @Column(name = "start_on")
    private Date startOn = new Date(System.currentTimeMillis());

    private long slideId;
    private Long groupId;
    private boolean presented;
    private PresentationStatus mode;

    public PresentHistoryEntity(long user, long presentationId, Long groupId, long slideId) {
        this.userId = user;
        this.presentationId = presentationId;
        this.groupId = groupId;
        this.slideId = slideId;
        this.presented = true;
        if (groupId == null) this.mode = PresentationStatus.PUBLIC;
        else this.mode = PresentationStatus.PRIVATE;
    }

//    public void addChat(ChatEntity mess) {
//        this.chats.add(mess);
//        mess.setPresentation(this);
//    }
//
//    public void removeChat(ChatEntity mess) {
//        this.chats.remove(mess);
//        mess.setPresentation(null);
//    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PresentHistoryEntity that = (PresentHistoryEntity) o;
        return Objects.equals(userId, that.userId) && Objects.equals(presentationId, that.presentationId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(presentationId, userId);
    }
}
