package com.example.backend.mapper;

import com.example.backend.model.dto.SlideDto;
import com.example.backend.model.entity.SlideEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-19T23:56:39+0700",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 18.0.2 (Amazon.com Inc.)"
)
@Component
public class SlideMapperImpl implements SlideMapper {

    @Override
    public SlideDto entityToDto(SlideEntity slideEntity) {
        if ( slideEntity == null ) {
            return null;
        }

        SlideDto slideDto = new SlideDto();

        slideDto.setId( slideEntity.getId() );
        slideDto.setText( slideEntity.getText() );
        slideDto.setGenreQuestion( slideEntity.getGenreQuestion() );
        slideDto.setImageURL( slideEntity.getImageURL() );

        return slideDto;
    }

    @Override
    public SlideEntity dtoToEntity(SlideDto slideDto) {
        if ( slideDto == null ) {
            return null;
        }

        SlideEntity slideEntity = new SlideEntity();

        slideEntity.setId( slideDto.getId() );
        slideEntity.setText( slideDto.getText() );
        slideEntity.setGenreQuestion( slideDto.getGenreQuestion() );
        slideEntity.setImageURL( slideDto.getImageURL() );

        return slideEntity;
    }
}
