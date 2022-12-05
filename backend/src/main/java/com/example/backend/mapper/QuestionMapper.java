package com.example.backend.mapper;

import com.example.backend.model.dto.QuestionDto;
import com.example.backend.model.entity.QuestionEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {AnswerMapper.class, UserQuestionMapper.class})
public interface QuestionMapper {
    @Mapping(target = "room", source = "room.name")
    QuestionDto entityToDto(QuestionEntity questionEntity);
    @Mapping(target = "room", ignore = true)
    QuestionEntity dtoToEntity(QuestionDto questionDto);
}
