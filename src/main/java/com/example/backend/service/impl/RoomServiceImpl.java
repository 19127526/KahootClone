package com.example.backend.service.impl;

import com.example.backend.common.model.Role;
import com.example.backend.common.utils.CodeGeneratorUtils;
import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.entity.AccountEntity;
import com.example.backend.model.entity.GroupEntity;
import com.example.backend.model.entity.UserGroupEntity;
import com.example.backend.model.request.CreateRoomRequest;
import com.example.backend.model.request.JoinRequest;
import com.example.backend.model.request.RemoveMemberRequest;
import com.example.backend.repository.*;
import com.example.backend.service.RoomService;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomServiceImpl implements RoomService {
    private final AccountRepository accountRepository;
    private final GroupRepository groupRepository;
    private final UserGroupRepository userGroupRepository;

    public UserGroupEntity join(JoinRequest joinRequest) {
        AccountEntity accountEntity = accountRepository.findAccountEntityByEmail(joinRequest.getEmail()).orElseThrow(() -> new ResourceNotFoundException("account " + joinRequest.getEmail() + " not found"));
        GroupEntity groupEntity = groupRepository.findRoomEntityByUrl(joinRequest.getUrl()).orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        List<UserGroupEntity> checking = userGroupRepository.fetchDataFromAccountAndRoom(accountEntity.getId(), groupEntity.getId());
        if (!checking.isEmpty())
            throw new ResourceInvalidException("account " + joinRequest.getEmail() + " exists in room");
        if (groupEntity.getCode().equals(joinRequest.getCode())) {
            UserGroupEntity userGroupEntity = new UserGroupEntity();
            accountEntity.addUserGroup(userGroupEntity);
            groupEntity.addUserGroup(userGroupEntity);
            accountRepository.save(accountEntity);
            groupRepository.save(groupEntity);
            return userGroupRepository.save(userGroupEntity);
        } else throw new ResourceNotFoundException("code invalid");
    }

    @Override
    public GroupEntity createRoom(CreateRoomRequest createRoomRequest) {
        AccountEntity accountEntity = accountRepository.findAccountEntityByEmail(createRoomRequest.getEmail()).orElseThrow(() -> new ResourceNotFoundException("%s invalid".formatted(createRoomRequest.getEmail())));
        if (groupRepository.findRoomEntityByName(createRoomRequest.getName()).isEmpty()) {
            GroupEntity groupEntity = new GroupEntity();
            groupEntity.setName(createRoomRequest.getName());
            groupEntity.setCode(CodeGeneratorUtils.invoke());
            groupEntity.setUrl("http://localhost:3000/group/detail/" + createRoomRequest.getName());
            UserGroupEntity userGroupEntity = new UserGroupEntity();
            userGroupEntity.setRole(Role.OWNER);
            accountEntity.addUserGroup(userGroupEntity);
            accountEntity.addGroup(groupEntity);
            groupEntity.addUserGroup(userGroupEntity);
            accountRepository.save(accountEntity);
            groupRepository.save(groupEntity);
            userGroupRepository.save(userGroupEntity);
            return groupEntity;
        } else throw new ResourceInvalidException("name room {%s} exists");
    }


    @Override
    public Boolean removeMember(RemoveMemberRequest removeMemberRequest) {
        AccountEntity accountEntity = accountRepository.findAccountEntityByEmail(removeMemberRequest.getGmail()).orElseThrow(() -> {throw new ResourceNotFoundException("email invalid");});
        GroupEntity groupEntity = groupRepository.findRoomEntityByName(removeMemberRequest.getNameRoom()).orElseThrow(() -> {throw new ResourceNotFoundException("room invalid");});
        UserGroupEntity userGroupEntity = userGroupRepository.findUserRoomEntityByUsers_IdAndGroup_Id(accountEntity.getId(), groupEntity.getId()).orElseThrow(() -> {throw new ResourceNotFoundException("user not in room");});
        accountEntity.removeUserGroup(userGroupEntity);
        groupEntity.removeUserGroup(userGroupEntity);
        userGroupRepository.delete(userGroupEntity);
        return true;
    }

    @Override
    public List<GroupEntity> getListRoomCreated(String email) {
        return groupRepository.findRoomEntitiesByCreated_Email(email);
    }

    @Override
    public List<GroupEntity> fetchRoomsJoined(String email) {
        if (email.isEmpty()) throw new ResourceInvalidException("email invalid");
        return groupRepository.getListRoomJoined(email);
    }

    @Override
    public List<Tuple> getDetail(long id) {
        return groupRepository.getGroupDetail(id);
    }

//    @Override
//    public QuestionEntity createSlide(QuestionDto questionDto) {
//        GroupEntity groupEntity = groupRepository.findRoomEntityByName(questionDto.getRoom()).orElseThrow(() -> {
//            throw new ResourceNotFoundException("room invalid");
//        });
//        Cloudinary cloudinary = CloudinaryConfig.getInstance();
//        try {
//            Map cloudinary_response = cloudinary.uploader().upload(questionDto.getImageFile().getBytes(), CloudinaryConfig.options(questionDto.getImageFile().getOriginalFilename()));
//            QuestionEntity questionEntity = questionMapper.dtoToEntity(questionDto);
//            questionEntity.setImageUrl(cloudinary_response.get("url").toString());
//            groupEntity.addPresentation(questionEntity);
//            groupRepository.save(groupEntity);
//            return questionRepository.save(questionEntity);
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//    }

//    @Override
//    public AnswerEntity createAnswer(AnswerDto answer) {
//        QuestionEntity questionEntity = questionRepository.findById(answer.getQuestion()).orElseThrow(() -> {throw new ResourceInvalidException("question invalid");});
//        AnswerEntity answerEntity = answerMapper.dtoToEntity(answer);
//        questionEntity.addAnswer(answerEntity);
//        questionRepository.save(questionEntity);
//        return answerRepository.save(answerEntity);
//    }
//
//    @Override
//    public void deleteAnswer(AnswerDto answer) {
//        QuestionEntity questionEntity = questionRepository.findById(answer.getQuestion()).orElseThrow(() -> {throw new ResourceInvalidException("question invalid");});
//        AnswerEntity answerEntity = answerRepository.findById(answer.getId()).orElseThrow(() -> {throw new ResourceInvalidException("answer invalid");});
//        userQuestionRepository.deleteAll(answerEntity.getUserAnswers());
//        questionEntity.removeAnswer(answerEntity);
//        answerRepository.delete(answerEntity);
//        questionRepository.save(questionEntity);
//    }
//
//    @Override
//    public AnswerEntity updateAnswer(AnswerDto answer) {
//        AnswerEntity answerEntity = answerRepository.findById(answer.getId()).orElseThrow(() -> {throw new ResourceInvalidException("answer invalid");});
//        answerEntity.setScore(answer.getScore());
//        answerEntity.setText(answer.getText());
//        return answerRepository.save(answerEntity);
//    }
}
