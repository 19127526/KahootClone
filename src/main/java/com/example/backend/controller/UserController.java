package com.example.backend.controller;

import com.example.backend.common.controller.BaseController;
import com.example.backend.mapper.UserMapper;
import com.example.backend.model.dto.GroupDto;
import com.example.backend.model.dto.PresentationDto;
import com.example.backend.model.dto.UserDto;
import com.example.backend.service.UserService;
import com.example.backend.service.GroupService;
import com.example.backend.service.PresentationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("account")
@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController extends BaseController {
    private final UserService userService;
    private final UserMapper userMapper;
    private final GroupService groupService;
    private final PresentationService presentationService;
    @PostMapping("update")
    public ResponseEntity<UserDto> updateAccount(@ModelAttribute("value") UserDto userDto) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(userMapper.entityToDto(userService.update(userDto)));
    }

    @GetMapping("listRoomCreated")
    public ResponseEntity<List<GroupDto>> getListRoomCreated(String email) {
        return ResponseEntity.status(HttpStatus.OK).body(groupService.getGroupsCreated(email));
    }

    @GetMapping("listRoomJoined")
    public ResponseEntity<List<GroupDto>> getListRoomJoined(String email) {
        return ResponseEntity.status(HttpStatus.OK).body(groupService.getGroupsJoined(email));
    }

    @GetMapping("listPresent")
    public ResponseEntity<List<PresentationDto>> getListPresents(String email) {
        return ResponseEntity.status(HttpStatus.OK).body(presentationService.getListJoin(email));
    }

    @GetMapping("listPresentPending")
    public ResponseEntity<List<PresentationDto>> getListPendingPresents(String email) {
        return ResponseEntity.status(HttpStatus.OK).body(presentationService.getListPending(email));
    }
}