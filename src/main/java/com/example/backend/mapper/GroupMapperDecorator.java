//package com.example.backend.mapper;
//
//import com.example.backend.common.model.Role;
//import com.example.backend.model.dto.GroupDto;
//import com.example.backend.model.dto.UserGroupDto;
//import com.example.backend.model.entity.GroupEntity;
//import com.example.backend.model.entity.UserEntity;
//import lombok.AllArgsConstructor;
//
//import java.util.HashMap;
//import java.util.List;
//
//@AllArgsConstructor
//public abstract class GroupMapperDecorator implements GroupMapper {
//    public static String EMAIL_MEMBER = "EMAIL";
//    public static String ROLE_MEMBER = "ROLE";
//    public static String IMAGE_MEMBER = "IMAGE";
//    private final GroupMapper delegate;
//
//    public GroupDto entityToDtoOverview(GroupEntity groupEntity, UserEntity user) {
//        GroupDto dto = delegate.entityToDto(groupEntity);
//        dto.setCreated(user.getEmail());
//        return dto;
//    }
//
//    public GroupDto entityToDtoDetail(GroupEntity groupEntity, List<HashMap<String, Object>> payloads) {
//        GroupDto dto = delegate.entityToDto(groupEntity);
//        List<UserGroupDto> users = payloads.stream().map(it -> {
//            UserGroupDto userGroupDto = new UserGroupDto();
//            userGroupDto.setEmail((String) it.get(EMAIL_MEMBER));
//            userGroupDto.setRole((Role) it.get(ROLE_MEMBER));
//            userGroupDto.setImageURL((String) it.get(IMAGE_MEMBER));
//            return userGroupDto;
//        }).toList();
//        dto.setUsers(users);
//        return dto;
//    }
//}
