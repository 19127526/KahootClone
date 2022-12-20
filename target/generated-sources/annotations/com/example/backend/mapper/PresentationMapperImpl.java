package com.example.backend.mapper;

import com.example.backend.model.dto.PresentationDto;
import com.example.backend.model.entity.PresentationEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-19T23:56:39+0700",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 18.0.2 (Amazon.com Inc.)"
)
@Component
public class PresentationMapperImpl implements PresentationMapper {

    @Override
    public PresentationDto entityToDto(PresentationEntity presentationEntity) {
        if ( presentationEntity == null ) {
            return null;
        }

        PresentationDto presentationDto = new PresentationDto();

        presentationDto.setId( presentationEntity.getId() );
        presentationDto.setName( presentationEntity.getName() );
        presentationDto.setStatus( presentationEntity.getStatus() );
        presentationDto.setCurrentSlide( presentationEntity.getCurrentSlide() );
        presentationDto.setInGroup( presentationEntity.getInGroup() );

        return presentationDto;
    }

    @Override
    public PresentationEntity dtoToEntity(PresentationDto presentationDto) {
        if ( presentationDto == null ) {
            return null;
        }

        PresentationEntity presentationEntity = new PresentationEntity();

        presentationEntity.setId( presentationDto.getId() );
        presentationEntity.setName( presentationDto.getName() );
        presentationEntity.setStatus( presentationDto.getStatus() );
        presentationEntity.setCurrentSlide( presentationDto.getCurrentSlide() );
        presentationEntity.setInGroup( presentationDto.getInGroup() );

        return presentationEntity;
    }
}
