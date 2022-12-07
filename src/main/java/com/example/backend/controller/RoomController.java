package com.example.backend.controller;

import com.example.backend.common.controller.BaseController;
import com.example.backend.common.model.EmailDto;
import com.example.backend.common.model.Role;
import com.example.backend.mapper.AnswerMapper;
import com.example.backend.mapper.GroupMapper;
import com.example.backend.mapper.QuestionMapper;
import com.example.backend.mapper.UserGroupMapper;
import com.example.backend.model.dto.GroupDto;
import com.example.backend.model.dto.UserGroupDto;
import com.example.backend.model.entity.AccountEntity;
import com.example.backend.model.entity.GroupEntity;
import com.example.backend.model.request.CreateRoomRequest;
import com.example.backend.model.request.JoinRequest;
import com.example.backend.service.EmailService;
import com.example.backend.service.RoomService;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("room")
@RequiredArgsConstructor
public class RoomController extends BaseController {
    private final EmailService emailService;
    private final GroupMapper groupMapper;
    private final RoomService roomService;
    private final QuestionMapper questionMapper;
    private final AnswerMapper answerMapper;
    private final UserGroupMapper userGroupMapper;

    @GetMapping("invite/sendEmail")
    public ResponseEntity<String> sendEmail(String email) {
        return new ResponseEntity<>(emailService.sendEmailInviteToRoom(new EmailDto("hello world", email)), HttpStatus.OK);
    }

    @PostMapping("generate")
    public ResponseEntity<GroupDto> generate(@RequestBody CreateRoomRequest createRoomRequest) {
        return new ResponseEntity<>(groupMapper.entityToDto(roomService.createRoom(createRoomRequest)), HttpStatus.ACCEPTED);
    }

    @GetMapping("detail")
    public ResponseEntity<GroupDto> getDetail(long id) {
        List<Tuple> data = roomService.getDetail(id);
        GroupEntity groupEntity = (GroupEntity) data.get(0).toArray()[0];
        GroupDto groupDto = groupMapper.entityToDto(groupEntity);
        LinkedList<UserGroupDto> users = new LinkedList<>();
        data.forEach(it -> {
            UserGroupDto temp = new UserGroupDto();
            AccountEntity account = (AccountEntity) it.toArray()[1];
            temp.setEmail(account.getEmail());
            temp.setUserName(account.getUserName());
            temp.setImageURL(account.getImageURL());
            temp.setRole((Role) it.toArray()[3]);
            users.add(temp);
        });
        groupDto.setUserGroup(users);
        return ResponseEntity.status(HttpStatus.OK).body(groupDto);
    }

    @PostMapping("join")
    public ResponseEntity<UserGroupDto> join(@RequestBody JoinRequest joinRequest) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(userGroupMapper.entityToDto(roomService.join(joinRequest)));
    }


//// working
//    @PostMapping("slide/add")
//    public ResponseEntity<QuestionDto> createSlide(@ModelAttribute("slide") QuestionDto questionDto) {
//        return ResponseEntity.status(HttpStatus.CREATED).body(questionMapper.entityToDto(roomService.createSlide(questionDto)));
//    }
//// working
//    @PostMapping("answer/add")
//    public ResponseEntity<AnswerDto> createAnswer(@RequestBody AnswerDto answerDto) {
//        return ResponseEntity.status(HttpStatus.CREATED).body(answerMapper.entityToDto(roomService.createAnswer(answerDto)));
//    }
//// working
//    @PostMapping("answer/update")
//    public ResponseEntity<AnswerDto> updateAnswer(@RequestBody AnswerDto answerDto) {
//        return ResponseEntity.status(HttpStatus.ACCEPTED).body(answerMapper.entityToDto(roomService.updateAnswer(answerDto)));
//    }
//// working
//    @PostMapping("answer/delete")
//    public ResponseEntity<Object> deleteAnswer(@RequestBody AnswerDto answers) {
//        roomService.deleteAnswer(answers);
//        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
//    }
}
