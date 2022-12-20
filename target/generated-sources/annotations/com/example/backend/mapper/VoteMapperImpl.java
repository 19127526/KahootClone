package com.example.backend.mapper;

import com.example.backend.model.dto.VoteDto;
import com.example.backend.model.entity.VoteEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-19T23:56:39+0700",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 18.0.2 (Amazon.com Inc.)"
)
@Component
public class VoteMapperImpl implements VoteMapper {

    @Override
    public VoteDto entityToDto(VoteEntity voteEntity) {
        if ( voteEntity == null ) {
            return null;
        }

        VoteDto voteDto = new VoteDto();

        voteDto.setId( voteEntity.getId() );
        voteDto.setText( voteEntity.getText() );

        return voteDto;
    }

    @Override
    public VoteEntity dtoToEntity(VoteDto voteDto) {
        if ( voteDto == null ) {
            return null;
        }

        VoteEntity voteEntity = new VoteEntity();

        voteEntity.setId( voteDto.getId() );
        voteEntity.setText( voteDto.getText() );

        return voteEntity;
    }
}
