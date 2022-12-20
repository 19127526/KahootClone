package com.example.backend.mapper;

import com.example.backend.model.dto.GroupDto;
import com.example.backend.model.entity.GroupEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-19T23:56:39+0700",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 18.0.2 (Amazon.com Inc.)"
)
@Component
public class GroupMapperImpl implements GroupMapper {

    @Override
    public GroupDto entityToDto(GroupEntity groupEntity) {
        if ( groupEntity == null ) {
            return null;
        }

        GroupDto groupDto = new GroupDto();

        groupDto.setId( groupEntity.getId() );
        groupDto.setName( groupEntity.getName() );
        groupDto.setDescription( groupEntity.getDescription() );
        groupDto.setCode( groupEntity.getCode() );
        groupDto.setPresent( groupEntity.getPresent() );

        return groupDto;
    }

    @Override
    public GroupEntity dtoToEntity(GroupDto groupDto) {
        if ( groupDto == null ) {
            return null;
        }

        GroupEntity groupEntity = new GroupEntity();

        groupEntity.setId( groupDto.getId() );
        groupEntity.setName( groupDto.getName() );
        groupEntity.setDescription( groupDto.getDescription() );
        groupEntity.setCode( groupDto.getCode() );
        groupEntity.setPresent( groupDto.getPresent() );

        return groupEntity;
    }
}
