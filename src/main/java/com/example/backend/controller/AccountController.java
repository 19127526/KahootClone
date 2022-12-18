package com.example.backend.controller;

import com.example.backend.common.controller.BaseController;
import com.example.backend.mapper.UserMapper;
import com.example.backend.model.dto.GroupDto;
import com.example.backend.model.dto.UserDto;
import com.example.backend.service.AccountService;
import com.example.backend.service.GroupService;
import com.fasterxml.jackson.annotation.JsonProperty;
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
public class AccountController extends BaseController {
    private final AccountService accountService;
    private final UserMapper userMapper;
    private final GroupService groupService;

    @PostMapping("update")
    public ResponseEntity<UserDto> updateAccount(@ModelAttribute("value") UserDto userDto) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(userMapper.entityToDto(accountService.update(userDto)));
    }

    @GetMapping("listRoomCreated")
    public ResponseEntity<List<GroupDto>> getListRoomCreated(String email) {
        return ResponseEntity.status(HttpStatus.OK).body(groupService.getGroupsCreated(email));
    }

    @GetMapping("listRoomJoined")
    public ResponseEntity<List<GroupDto>> getListRoomJoined(String email) {
        return ResponseEntity.status(HttpStatus.OK).body(groupService.getGroupsJoined(email));
    }

    @PostMapping("checking")
    public String checking(@RequestBody Check check) {
        return check.toString();
    }
}

class Check {
    @JsonProperty(value = "1", defaultValue = "hello")
    String a = "hellooo";
    @JsonProperty(value = "2", required = true)
    String b;
    @JsonProperty("3")
    String c;
    @JsonProperty("4")
    String d;

    @Override
    public String toString() {
        return "Check{" +
                "a='" + a + '\'' +
                ", b='" + b + '\'' +
                ", c='" + c + '\'' +
                ", d='" + d + '\'' +
                '}';
    }
}
