package com.example.backend.mapper;

import com.example.backend.model.dto.UserDto;
import com.example.backend.model.entity.UserEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto entityToDto(UserEntity userEntity);
    UserEntity dtoToEntity(UserDto userDto);
}
