package com.example.backend.mapper;

import com.example.backend.model.dto.ChatDto;
import com.example.backend.model.entity.ChatEntity;
import com.example.backend.model.request.ChatRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-19T23:56:39+0700",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 18.0.2 (Amazon.com Inc.)"
)
@Component
public class ChatMapperImpl implements ChatMapper {

    @Override
    public ChatDto entityToDto(ChatEntity chatEntity) {
        if ( chatEntity == null ) {
            return null;
        }

        ChatDto chatDto = new ChatDto();

        return chatDto;
    }

    @Override
    public ChatEntity payloadToEntity(ChatRequest chatRequest) {
        if ( chatRequest == null ) {
            return null;
        }

        ChatEntity chatEntity = new ChatEntity();

        chatEntity.setMess( chatRequest.getMess() );
        chatEntity.setSender( chatRequest.getSender() );

        return chatEntity;
    }
}
