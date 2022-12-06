package com.example.backend.mapper;

import com.example.backend.model.dto.AnswerDto;
import com.example.backend.model.entity.AnswerEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = UserAnswerMapper.class)
public interface AnswerMapper {
    @Mapping(target = "question", source = "question.id")
    AnswerDto entityToDto(AnswerEntity answerEntity);
    @Mapping(target = "question", ignore = true)
    AnswerEntity dtoToEntity(AnswerDto answerDto);
}
