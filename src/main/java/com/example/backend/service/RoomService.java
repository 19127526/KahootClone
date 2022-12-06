package com.example.backend.service;

import com.example.backend.model.dto.AnswerDto;
import com.example.backend.model.dto.QuestionDto;
import com.example.backend.model.entity.AnswerEntity;
import com.example.backend.model.entity.GroupEntity;
import com.example.backend.model.entity.QuestionEntity;
import com.example.backend.model.entity.UserGroupEntity;
import com.example.backend.model.request.CreateRoomRequest;
import com.example.backend.model.request.JoinRequest;
import com.example.backend.model.request.RemoveMemberRequest;
import com.querydsl.core.Tuple;

import java.util.List;

public interface RoomService {
    UserGroupEntity join(JoinRequest joinRequest);
    GroupEntity createRoom(CreateRoomRequest createRoomRequest);
    Boolean removeMember(RemoveMemberRequest removeRequest);
    List<GroupEntity> getListRoomCreated(String email);
    List<GroupEntity> fetchRoomsJoined(String email);
    List<Tuple> getDetail(long id);
//    QuestionEntity createSlide(QuestionDto questionDto);
//    AnswerEntity createAnswer(AnswerDto answer);
//    void deleteAnswer(AnswerDto answers);
//    AnswerEntity updateAnswer(AnswerDto answer);
}
