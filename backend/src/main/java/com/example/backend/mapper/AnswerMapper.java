package com.example.backend.mapper;

import com.example.backend.model.dto.AnswerDto;
import com.example.backend.model.entity.AnswerEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = UserQuestionMapper.class)
public interface AnswerMapper {
    @Mapping(target = "questionId", source = "questionId.id")
    AnswerDto entityToDto(AnswerEntity answerEntity);
    @Mapping(target = "questionId", ignore = true)
    AnswerEntity dtoToEntity(AnswerDto answerDto);
}
