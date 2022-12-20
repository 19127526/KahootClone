package com.example.backend.mapper;

import com.example.backend.model.dto.UserDto;
import com.example.backend.model.entity.UserEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-19T23:56:39+0700",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 18.0.2 (Amazon.com Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto entityToDto(UserEntity userEntity) {
        if ( userEntity == null ) {
            return null;
        }

        UserDto userDto = new UserDto();

        userDto.setId( userEntity.getId() );
        userDto.setUserName( userEntity.getUserName() );
        userDto.setEmail( userEntity.getEmail() );
        userDto.setPassword( userEntity.getPassword() );
        userDto.setImageURL( userEntity.getImageURL() );

        return userDto;
    }

    @Override
    public UserEntity dtoToEntity(UserDto userDto) {
        if ( userDto == null ) {
            return null;
        }

        UserEntity userEntity = new UserEntity();

        userEntity.setId( userDto.getId() );
        userEntity.setUserName( userDto.getUserName() );
        userEntity.setEmail( userDto.getEmail() );
        userEntity.setPassword( userDto.getPassword() );
        userEntity.setImageURL( userDto.getImageURL() );

        return userEntity;
    }
}
