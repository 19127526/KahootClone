package com.example.backend.mapper;

import com.example.backend.model.dto.UserGroupDto;
import com.example.backend.model.entity.UserGroupEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserGroupMapper {
    @Mapping(target = "userName", source = "users.userName")
    @Mapping(target = "email", source = "users.email")
    @Mapping(target = "imageURL", source = "users.imageURL")
    @Mapping(target = "group", source = "group.id")
    UserGroupDto entityToDto(UserGroupEntity userGroupEntity);

    @Mapping(target = "group", ignore = true)
    UserGroupEntity dtoToEntity(UserGroupDto userRoomDto);
}
