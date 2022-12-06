package com.example.backend.mapper;

import com.example.backend.model.dto.PresentationDto;
import com.example.backend.model.entity.PresentationEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {QuestionMapper.class})
public interface PresentationMapper {
    @Mapping(target = "author", source = "author.email")
    PresentationDto entityToDto(PresentationEntity presentationEntity);
    @Mapping(target = "author", ignore = true)
    PresentationEntity dtoToEntity(PresentationDto presentationDto);
}
