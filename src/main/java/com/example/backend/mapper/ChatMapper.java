package com.example.backend.mapper;

import com.example.backend.model.dto.ChatDto;
import com.example.backend.model.entity.ChatEntity;
import com.example.backend.model.request.ChatRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ChatMapper {
    ChatDto entityToDto(ChatEntity chatEntity);
    @Mapping(target = "presentation", ignore = true)
    ChatEntity payloadToEntity(ChatRequest chatRequest);
}
