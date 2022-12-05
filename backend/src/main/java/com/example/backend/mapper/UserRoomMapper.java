package com.example.backend.mapper;

import com.example.backend.model.dto.UserRoomDto;
import com.example.backend.model.entity.UserRoomEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserRoomMapper {
    @Mapping(target = "userName", source = "user.userName")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "imageURL", source = "user.imageURL")
    UserRoomDto entityToDto(UserRoomEntity userRoomEntity);

//    UserRoomEntity dtoToEntity(UserRoomDto userRoomDto);
}
