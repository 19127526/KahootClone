package com.example.backend.mapper;

import com.example.backend.model.dto.UserVoteDto;
import com.example.backend.model.entity.UserVoteEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserVoteMapper {
//    @Mapping(target = "users", ignore = true)
//    @Mapping(target = "vote", ignore = true)
//    UserVoteDto entityToDto(UserVoteEntity userVoteEntity);
//
//    @Mapping(target = "users", ignore = true)
//    @Mapping(target = "vote", ignore = true)
//    UserVoteEntity dtoToEntity(UserVoteDto userVoteDto);
}
