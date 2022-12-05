package com.example.backend.service.impl;

import com.cloudinary.Cloudinary;
import com.example.backend.common.configure.CloudinaryConfig;
import com.example.backend.common.model.Role;
import com.example.backend.common.utils.CodeGeneratorUtils;
import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.mapper.AnswerMapper;
import com.example.backend.mapper.QuestionMapper;
import com.example.backend.model.dto.AnswerDto;
import com.example.backend.model.dto.QuestionDto;
import com.example.backend.model.entity.*;
import com.example.backend.model.request.CreateRoomRequest;
import com.example.backend.model.request.JoinRequest;
import com.example.backend.model.request.RemoveRequest;
import com.example.backend.repository.*;
import com.example.backend.service.RoomService;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomServiceImpl implements RoomService {
    private final EntityManager entityManager;
    private final AccountRepository accountRepository;
    private final RoomRepository roomRepository;
    private final UserRoomRepository userRoomRepository;
    private final QuestionMapper questionMapper;
    private final QuestionRepository questionRepository;
    private final AnswerMapper answerMapper;
    private final AnswerRepository answerRepository;
    private final UserQuestionRepository userQuestionRepository;

    public UserRoomEntity join(JoinRequest joinRequest) {
        AccountEntity accountEntity = accountRepository.findAccountEntityByEmail(joinRequest.getEmail()).orElseThrow(() -> new ResourceNotFoundException("account " + joinRequest.getEmail() + " not found"));
        RoomEntity roomEntity = roomRepository.findRoomEntityByUrl(joinRequest.getUrl()).orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        List<UserRoomEntity> checking = userRoomRepository.fetchDataFromAccountAndRoom(accountEntity.getId(), roomEntity.getId());
        if (!checking.isEmpty())
            throw new ResourceInvalidException("account " + joinRequest.getEmail() + " exists in room");
        if (roomEntity.getCode().equals(joinRequest.getCode())) {
            UserRoomEntity userRoomEntity = new UserRoomEntity(0, null, null, Role.MEMBER, 0);
            accountEntity.addUserRoom(userRoomEntity);
            roomEntity.addUserRoom(userRoomEntity);
            accountRepository.save(accountEntity);
            roomRepository.save(roomEntity);
            return userRoomRepository.save(userRoomEntity);
        } else throw new ResourceNotFoundException("code invalid");
    }

    @Override
    public RoomEntity createRoom(CreateRoomRequest createRoomRequest) {
        AccountEntity accountEntity = accountRepository.findAccountEntityByEmail(createRoomRequest.getEmail()).orElseThrow(() -> new ResourceNotFoundException("%s invalid".formatted(createRoomRequest.getEmail())));
        if (roomRepository.findRoomEntityByName(createRoomRequest.getName()).isEmpty()) {
            RoomEntity roomEntity = new RoomEntity();
            roomEntity.setName(createRoomRequest.getName());
            roomEntity.setCode(CodeGeneratorUtils.invoke());
            roomEntity.setUrl("https://www.google.com/" + createRoomRequest.getName());
            UserRoomEntity userRoomEntity = new UserRoomEntity();
            userRoomEntity.setRole(Role.OWNER);
            accountEntity.addUserRoom(userRoomEntity);
            accountEntity.addRoom(roomEntity);
            roomEntity.addUserRoom(userRoomEntity);
            accountRepository.save(accountEntity);
            roomRepository.save(roomEntity);
            userRoomRepository.save(userRoomEntity);
            return roomEntity;
        } else throw new ResourceInvalidException("name room {%s} exists");
    }


    @Override
    public AccountEntity removeMember(RemoveRequest removeRequest) {
        return null;
    }

    @Override
    public List<RoomEntity> getListRoomCreated(String email) {
        return roomRepository.findRoomEntitiesByAccountEntity_Email(email);
    }

    @Override
    public List<RoomEntity> fetchRoomsJoined(String email) {
        if (email.isEmpty()) throw new ResourceInvalidException("email invalid");
        return roomRepository.getListRoomJoined(email);
    }

    @Override
    public List<Tuple> getDetail(String name) {
        return roomRepository.getGroupDetail(name);
    }

    @Override
    public QuestionEntity createSlide(QuestionDto questionDto) {
        RoomEntity roomEntity = roomRepository.findRoomEntityByName(questionDto.getRoom()).orElseThrow(() -> {
            throw new ResourceNotFoundException("room invalid");
        });
        Cloudinary cloudinary = CloudinaryConfig.getInstance();
        try {
            Map cloudinary_response = cloudinary.uploader().upload(questionDto.getImageFile().getBytes(), CloudinaryConfig.options(questionDto.getImageFile().getOriginalFilename()));
            QuestionEntity questionEntity = questionMapper.dtoToEntity(questionDto);
            questionEntity.setImageUrl(cloudinary_response.get("url").toString());
            roomEntity.addQuestion(questionEntity);
            roomRepository.save(roomEntity);
            return questionRepository.save(questionEntity);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public AnswerEntity createAnswer(AnswerDto answer) {
        QuestionEntity questionEntity = questionRepository.findById(answer.getQuestionId()).orElseThrow(() -> {throw new ResourceInvalidException("question invalid");});
        AnswerEntity answerEntity = answerMapper.dtoToEntity(answer);
        questionEntity.addAnswer(answerEntity);
        questionRepository.save(questionEntity);
        return answerRepository.save(answerEntity);
    }

    @Override
    public void deleteAnswer(AnswerDto answer) {
        QuestionEntity questionEntity = questionRepository.findById(answer.getQuestionId()).orElseThrow(() -> {throw new ResourceInvalidException("question invalid");});
        AnswerEntity answerEntity = answerRepository.findById(answer.getId()).orElseThrow(() -> {throw new ResourceInvalidException("answer invalid");});
        userQuestionRepository.deleteAll(answerEntity.getUserQuestions());
        questionEntity.removeAnswer(answerEntity);
        answerRepository.delete(answerEntity);
        questionRepository.save(questionEntity);
    }

    @Override
    public AnswerEntity updateAnswer(AnswerDto answer) {
        AnswerEntity answerEntity = answerRepository.findById(answer.getId()).orElseThrow(() -> {throw new ResourceInvalidException("answer invalid");});
        answerEntity.setScore(answer.getScore());
        answerEntity.setText(answer.getText());
        return answerRepository.save(answerEntity);
    }
}
