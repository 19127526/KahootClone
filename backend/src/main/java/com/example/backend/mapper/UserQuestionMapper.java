package com.example.backend.mapper;

import com.example.backend.model.dto.UserQuestionDto;
import com.example.backend.model.entity.UserQuestionEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserQuestionMapper {
    @Mapping(target = "question", source = "question.id")
    @Mapping(target = "user", source = "user.email")
    @Mapping(target = "answer", source = "answer.text")
    UserQuestionDto entityToDto(UserQuestionEntity userQuestionEntity);
    @Mapping(target = "question", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "answer", ignore = true)
    UserQuestionEntity dtoToEntity(UserQuestionDto userQuestionDto);
}
