package com.example.backend.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
public class RoomDto {
    private String name;
    private Integer capacity;
    private String type;
    private String url;
    private String code;
    private List<QuestionDto> questionEntitySet;
//    private List<UserRoomDto> userRoomEntitySet;
//    private List<UserQuestionDto> userQuestionEntities;
}
