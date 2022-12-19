package com.example.backend.service.impl;

import com.example.backend.common.model.Role;
import com.example.backend.common.utils.CodeGeneratorUtils;
import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.mapper.GroupMapper;
import com.example.backend.model.dto.GroupDto;
import com.example.backend.model.dto.UserGroupDto;
import com.example.backend.model.entity.GroupEntity;
import com.example.backend.model.entity.UserEntity;
import com.example.backend.model.entity.UserGroupEntity;
import com.example.backend.model.request.GroupRequest;
import com.example.backend.repository.GroupRepository;
import com.example.backend.repository.UserGroupRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.GroupService;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class GroupServiceImpl implements GroupService {
    private final UserGroupRepository userGroupRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    private final GroupMapper groupMapper;


    @Override
    public GroupEntity createRoom(GroupRequest groupRequest) {
        if (groupRequest.getNameGroup() == null || groupRequest.getEmail() == null) {
            throw new ResourceInvalidException("request invalid");
        }
        UserEntity userEntity = userRepository.findAccountEntityByEmail(groupRequest.getEmail()).orElseThrow(() -> new ResourceNotFoundException(groupRequest.getEmail() + " invalid"));
        GroupEntity group = new GroupEntity();
        group.setName(groupRequest.getNameGroup());
        group.setCode(CodeGeneratorUtils.invoke());
        userEntity.addGroup(group);
        userEntity.addGroupCreated(group);
        group = groupRepository.save(group);
        userRepository.save(userEntity);
        return group;
    }


    @Override
    public void removeMember(GroupRequest groupRequest) {
        Tuple user_group = userRepository.getUserAndGroupWithRoles(groupRequest.getEmail(), groupRequest.getId(), List.of(Role.Co_OWNER, Role.MEMBER)).orElseThrow(() -> new ResourceInvalidException("user is not in a group"));
        UserEntity user = (UserEntity) user_group.toArray()[0];
        GroupEntity group = (GroupEntity) user_group.toArray()[1];
        // check
        group.removeUserGroup(user);
        groupRepository.save(group);
    }

    // done
    @Override
    public List<GroupDto> getGroupsCreated(String email) {
        if (email.isEmpty()) throw new ResourceInvalidException("email invalid");
        return groupRepository.getListGroups(email, List.of(Role.OWNER)).stream().map(tuple -> {
            GroupEntity group = (GroupEntity) tuple.toArray()[0];
            GroupDto groupDto = groupMapper.entityToDto(group);
            groupDto.setCreated(email);
            return groupDto;
        }).toList();
    }

    // done
    @Override
    public List<GroupDto> getGroupsJoined(String email) {
        if (email.isEmpty()) throw new ResourceInvalidException("email invalid");
        return groupRepository.getListGroups(email, List.of(Role.MEMBER, Role.Co_OWNER)).stream().map(tuple -> {
            Object[] payload = tuple.toArray();
            String author = (String) payload[1];
            GroupEntity group = (GroupEntity) payload[0];
            GroupDto groupDto = groupMapper.entityToDto(group);
            groupDto.setCreated(author);
            return groupDto;
        }).toList();
    }

    @Override
    public GroupDto getDetail(GroupRequest groupRequest) {
        Tuple user_group = groupRepository.getUserAndGroupWithRoles(groupRequest.getEmail(), groupRequest.getId(), List.of(Role.OWNER, Role.Co_OWNER, Role.MEMBER)).orElseThrow(() -> {
            throw new ResourceInvalidException("Permission denied");
        });
        GroupEntity group = (GroupEntity) user_group.toArray()[1];
        GroupDto groupDto = groupMapper.entityToDto(group);
        List<UserGroupDto> userGroups = groupRepository.getGroupDetail(groupRequest.getId()).stream().map(tuple -> {
            UserEntity user = (UserEntity) tuple.toArray()[0];
            Role role = (Role) tuple.toArray()[1];
            if (role == Role.OWNER) groupDto.setCreated(user.getEmail());
            return UserGroupDto.builder().id(user.getId()).group(groupRequest.getId()).email(groupRequest.getEmail()).userName(user.getUserName()).imageURL(user.getImageURL()).role(role).build();
        }).toList();
        groupDto.setUsers(userGroups);
        return groupDto;
    }

    @Override
    public void delete(GroupRequest groupRequest) {
        groupRepository.deleteById(groupRequest.getId());
    }

    @Override
    public void assignRole(GroupRequest groupRequest) {
        userRepository.getUserAndGroupWithRoles(groupRequest.getEmailAssign(), groupRequest.getId(), List.of(Role.Co_OWNER, Role.MEMBER)).orElseThrow(() -> {
            throw new ResourceInvalidException("account " + groupRequest.getEmailAssign() + "not exists in room");
        });

        userRepository.getUserAndGroupWithRoles(groupRequest.getEmail(), groupRequest.getId(), List.of(Role.OWNER)).orElseThrow(() -> {
            throw new ResourceInvalidException("assign fail");
        });
        UserGroupEntity userGroup = userGroupRepository.findUserGroupEntityByGroup_IdAndUsers_Email(groupRequest.getId(), groupRequest.getEmailAssign()).get();
        userGroup.setRole(groupRequest.getRole());
        userGroupRepository.save(userGroup);
    }

    public GroupEntity join(GroupRequest groupRequest) {
        if (groupRequest.getEmail() == null || groupRequest.getCode() == null || groupRequest.getId() == null) {
            throw new ResourceInvalidException("request invalid");
        }
        UserEntity userEntity = userRepository.findAccountEntityByEmail(groupRequest.getEmail()).orElseThrow(() -> new ResourceNotFoundException("account " + groupRequest.getEmail() + " not found"));
        GroupEntity group = groupRepository.findById(groupRequest.getId()).orElseThrow(() -> new ResourceNotFoundException("group not found"));
        if (userRepository.getUserAndGroupWithRoles(groupRequest.getEmail(), groupRequest.getId(), List.of(Role.OWNER, Role.Co_OWNER, Role.MEMBER)).isPresent()) {
            throw new ResourceInvalidException("account " + groupRequest.getEmail() + " exists in room");
        }
        if (group.getCode().equals(groupRequest.getCode())) {
            group.addUser(userEntity);
            return groupRepository.save(group);
        } else throw new ResourceNotFoundException("code invalid");
    }
}
