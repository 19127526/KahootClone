package com.example.backend.mapper;

import com.example.backend.model.dto.PresentDto;
import com.example.backend.model.dto.SlideDto;
import com.example.backend.model.entity.SlideEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SlideMapper {
    @Mapping(target = "presentation", ignore = true)
    @Mapping(target = "votes", ignore = true)
    SlideDto entityToDto(SlideEntity slideEntity);

    @Mapping(target = "slideId", source = "id")
    @Mapping(target = "votes", ignore = true)
    PresentDto toPresent(SlideEntity slideEntity);

    @Mapping(target = "presentation", ignore = true)
    @Mapping(target = "votes", ignore = true)
    SlideEntity dtoToEntity(SlideDto slideDto);
}
