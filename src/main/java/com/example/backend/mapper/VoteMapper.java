package com.example.backend.mapper;

import com.example.backend.model.dto.VoteDto;
import com.example.backend.model.entity.VoteEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = UserVoteMapper.class)
public interface VoteMapper {
    @Mapping(target = "slide", ignore = true)
    @Mapping(target = "users", ignore = true)
    VoteDto entityToDto(VoteEntity voteEntity);
    @Mapping(target = "slide", ignore = true)
    @Mapping(target = "users", ignore = true)
    VoteEntity dtoToEntity(VoteDto voteDto);
}