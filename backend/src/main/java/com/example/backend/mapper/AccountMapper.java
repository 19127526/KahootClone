package com.example.backend.mapper;

import com.example.backend.model.dto.AccountDto;
import com.example.backend.model.entity.AccountEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    AccountDto entityToDto(AccountEntity accountEntity);
    @Mapping(target = "userRoomEntities", ignore = true)
    @Mapping(target = "userQuestionEntities", ignore = true)
    AccountEntity dtoToEntity(AccountDto accountDto);
}
