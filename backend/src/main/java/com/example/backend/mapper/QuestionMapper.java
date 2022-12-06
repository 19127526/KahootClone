package com.example.backend.mapper;

import com.example.backend.model.dto.QuestionDto;
import com.example.backend.model.entity.QuestionEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {AnswerMapper.class})
public interface QuestionMapper {
    @Mapping(target = "presentation", source = "presentation.id")
    QuestionDto entityToDto(QuestionEntity questionEntity);
    @Mapping(target = "presentation", ignore = true)
    QuestionEntity dtoToEntity(QuestionDto questionDto);
}
