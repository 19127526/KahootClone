package com.example.backend.controller;

import com.example.backend.common.controller.BaseController;
import com.example.backend.common.model.EmailDto;
import com.example.backend.mapper.RoomMapper;
import com.example.backend.model.dto.RoomDto;
import com.example.backend.model.request.CreateRoomRequest;
import com.example.backend.service.EmailService;
import com.example.backend.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("room")
@RequiredArgsConstructor
public class RoomController extends BaseController {
    private final EmailService emailService;
    private final RoomMapper roomMapper;
    private final RoomService roomService;
    @GetMapping("invite/sendEmail")
    public ResponseEntity<String> sendEmail(String email) {
        return new ResponseEntity<>(emailService.sendEmailInviteToRoom(new EmailDto("hello world",email)), HttpStatus.OK);
    }

    @PostMapping("generate")
    public ResponseEntity<RoomDto> generate(@RequestBody CreateRoomRequest createRoomRequest) {
        return new ResponseEntity<>(roomMapper.entityToDto(roomService.createRoom(createRoomRequest)),HttpStatus.ACCEPTED);
    }

//    public ResponseEntity<UserRoomDto> join(@RequestBody JoinRequest joinRequest) {
//
//    }

}
