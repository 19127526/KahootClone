package com.example.backend.mapper;

import com.example.backend.model.dto.RoomDto;
import com.example.backend.model.entity.RoomEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    RoomEntity dtoToEntity(RoomDto roomDto);
    RoomDto entityToDto(RoomEntity roomEntity);
}
