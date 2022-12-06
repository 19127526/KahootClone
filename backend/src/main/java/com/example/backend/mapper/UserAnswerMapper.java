package com.example.backend.mapper;

import com.example.backend.model.dto.UserAnswerDto;
import com.example.backend.model.entity.UserAnswerEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserAnswerMapper {
    @Mapping(target = "answer", source = "answer.id")
    UserAnswerDto entityToDto(UserAnswerEntity userAnswerEntity);
    @Mapping(target = "answer", ignore = true)
    UserAnswerEntity dtoToEntity(UserAnswerDto userAnswerDto);
}
