package com.example.backend.service.impl;

import com.example.backend.common.model.Role;
import com.example.backend.common.utils.CodeGeneratorUtils;
import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.entity.AccountEntity;
import com.example.backend.model.entity.RoomEntity;
import com.example.backend.model.entity.UserRoomEntity;
import com.example.backend.model.request.CreateRoomRequest;
import com.example.backend.model.request.JoinRequest;
import com.example.backend.model.request.RemoveRequest;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.RoomRepository;
import com.example.backend.repository.UserRoomRepository;
import com.example.backend.service.RoomService;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomServiceImpl implements RoomService {
    private final EntityManager entityManager;
    private final AccountRepository accountRepository;
    private final RoomRepository roomRepository;
    private final UserRoomRepository userRoomRepository;
    public UserRoomEntity addMember(JoinRequest joinRequest) {
        AccountEntity accountEntity = accountRepository
                .findAccountEntityByEmail(joinRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("account {%s} not found".formatted(joinRequest.getEmail())));
        RoomEntity roomEntity = roomRepository
                .findRoomEntityByUrl(joinRequest.getUrl())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        if(roomEntity.getCode().equals(joinRequest.getCode())) {
            UserRoomEntity userRoomEntity = new UserRoomEntity(0,null,null, Role.MEMBER,0);
            accountEntity.addUserRoom(userRoomEntity);
            roomEntity.addUserRoom(userRoomEntity);
            entityManager.persist(accountEntity);
            roomRepository.save(roomEntity);
//            entityManager.persist(roomEntity);
            return userRoomRepository.save(userRoomEntity);
        }else throw new ResourceNotFoundException("code invalid");
    }

    @Override
    public RoomEntity createRoom(CreateRoomRequest createRoomRequest) {
        AccountEntity accountEntity = accountRepository
                .findAccountEntityByEmail(createRoomRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("%s invalid".formatted(createRoomRequest.getEmail())));
        if(roomRepository.findRoomEntityByName(createRoomRequest.getName()).isEmpty()) {
            RoomEntity roomEntity = new RoomEntity();
            roomEntity.setName(createRoomRequest.getName());
            roomEntity.setCode(CodeGeneratorUtils.invoke());
            roomEntity.setUrl("https://www.google.com/" + createRoomRequest.getName());
            UserRoomEntity userRoomEntity = new UserRoomEntity();
            userRoomEntity.setRole(Role.OWNER);
            accountEntity.addUserRoom(userRoomEntity);
            accountEntity.addRoomEntity(roomEntity);
            roomEntity.addUserRoom(userRoomEntity);
            accountRepository.save(accountEntity);
            roomRepository.save(roomEntity);
            userRoomRepository.save(userRoomEntity);
            return roomEntity;
        }else throw new ResourceInvalidException("name room {%s} exists");
    }


    @Override
    public AccountEntity removeMember(RemoveRequest removeRequest) {
        return null;
    }

    @Override
    public List<RoomEntity> getListRoom(String email) {
        return roomRepository.findRoomEntitiesByAccountEntity_Email(email);
    }

    @Override
    public List<Tuple> getDetail(String name) {
        return roomRepository.getGroupDetail(name);
    }
}
