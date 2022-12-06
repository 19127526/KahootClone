package com.example.backend.mapper;

import com.example.backend.model.dto.AccountDto;
import com.example.backend.model.entity.AccountEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserGroupMapper.class, GroupMapper.class, PresentationMapper.class})
public interface AccountMapper {
    AccountDto entityToDto(AccountEntity accountEntity);
    AccountEntity dtoToEntity(AccountDto accountDto);
}
