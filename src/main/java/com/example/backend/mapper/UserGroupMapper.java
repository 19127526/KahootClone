package com.example.backend.mapper;

import com.example.backend.model.dto.UserGroupDto;
import com.example.backend.model.entity.UserGroupEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserGroupMapper {
//    @Mapping(target = "group", ignore = true)
//    @Mapping(target = "joinOn", ignore = true)
//    UserGroupDto entityToDto(UserGroupEntity userGroupEntity);
//
//    @Mapping(target = "group", ignore = true)
//    @Mapping(target = "joinOn", ignore = true)
//    UserGroupEntity dtoToEntity(UserGroupDto userRoomDto);
}
