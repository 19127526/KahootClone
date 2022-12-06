package com.example.backend.mapper;

import com.example.backend.model.dto.GroupDto;
import com.example.backend.model.entity.GroupEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {PresentationMapper.class, UserGroupMapper.class})
public interface GroupMapper {
    @Mapping(target = "created", source = "created.email")
    GroupDto entityToDto(GroupEntity groupEntity);

    @Mapping(target = "created", ignore = true)
    GroupEntity dtoToEntity(GroupDto groupDto);
}
