package com.example.backend.mapper;

import com.example.backend.model.dto.QuestionDto;
import com.example.backend.model.entity.QuestionEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    QuestionDto entityToDto(QuestionEntity questionAndAnswer);
}
