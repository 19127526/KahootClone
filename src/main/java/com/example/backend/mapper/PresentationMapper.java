package com.example.backend.mapper;

import com.example.backend.model.dto.PresentationDto;
import com.example.backend.model.entity.PresentationEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {SlideMapper.class})
public interface PresentationMapper {
    @Mapping(target = "author", ignore = true)
    @Mapping(target = "slides", ignore = true)
    PresentationDto entityToDto(PresentationEntity presentationEntity);


    @Mapping(target = "author", ignore = true)
    @Mapping(target = "slides", ignore = true)
    PresentationEntity dtoToEntity(PresentationDto presentationDto);
}
