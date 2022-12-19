package com.example.backend.mapper;

import com.example.backend.model.dto.GroupDto;
import com.example.backend.model.entity.GroupEntity;
import com.example.backend.model.request.GroupRequest;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {PresentationMapper.class, UserGroupMapper.class})
public interface GroupMapper {
    @Mapping(target = "users", ignore = true)
    @Mapping(target = "created", ignore = true)
    GroupDto entityToDto(GroupEntity groupEntity);


    @Mapping(target = "name", source = "nameGroup")
    @Mapping(target = "created", source = "email")
    GroupDto requestToDto(GroupRequest groupRequest);


    @Mapping(target = "users", ignore = true)
    @Mapping(target = "created", ignore = true)
    GroupEntity dtoToEntity(GroupDto groupDto);
}
