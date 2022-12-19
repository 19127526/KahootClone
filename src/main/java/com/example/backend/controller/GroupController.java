package com.example.backend.controller;

import com.example.backend.common.controller.BaseController;
import com.example.backend.mapper.GroupMapper;
import com.example.backend.model.dto.GroupDto;
import com.example.backend.model.request.GroupRequest;
import com.example.backend.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("group")
@RequiredArgsConstructor
public class GroupController extends BaseController {
    private final GroupMapper groupMapper;
    private final GroupService groupService;

    @GetMapping("detail")
    public ResponseEntity<GroupDto> getDetail(@RequestBody GroupRequest groupRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(groupService.getDetail(groupRequest));
    }

    @PostMapping("generate")
    public ResponseEntity<GroupDto> add(@RequestBody GroupRequest groupRequest) {
        GroupDto dto = groupMapper.entityToDto(groupService.createRoom(groupRequest));
        dto.setCreated(groupRequest.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PostMapping("update")
    public ResponseEntity<GroupDto> update(@RequestBody GroupRequest groupRequest) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
    }

    @PostMapping("delete")
    public ResponseEntity<Object> delete(@RequestBody GroupRequest groupRequest) {
        groupService.delete(groupRequest);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    @PostMapping("remove/member")
    public ResponseEntity<Object> removeMember(@RequestBody GroupRequest groupRequest) {
        groupService.removeMember(groupRequest);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }


    @PostMapping("join")
    public ResponseEntity<GroupDto> join(@RequestBody GroupRequest groupRequest) {
        groupService.join(groupRequest);
        // request 2 time.
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(groupService.getDetail(groupRequest));
    }

    @PostMapping("assignRole")
    public ResponseEntity<Object> assignRole(@RequestBody GroupRequest groupRequest) {
        groupService.assignRole(groupRequest);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
    }
}
