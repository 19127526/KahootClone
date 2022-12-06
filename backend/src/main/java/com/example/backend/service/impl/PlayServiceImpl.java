package com.example.backend.service.impl;

import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.mapper.QuestionMapper;
import com.example.backend.model.entity.AccountEntity;
import com.example.backend.model.entity.AnswerEntity;
import com.example.backend.model.entity.QuestionEntity;
import com.example.backend.model.entity.UserAnswerEntity;
import com.example.backend.model.request.PlayingRequest;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.AnswerRepository;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.UserQuestionRepository;
import com.example.backend.service.PlayService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PlayServiceImpl {
    private final UserQuestionRepository userQuestionRepository;
    private final QuestionRepository questionRepository;
    private final AccountRepository accountRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final AnswerRepository answerRepository;
    private final QuestionMapper questionMapper;

//    @Override
//    public boolean choseAnswer(PlayingRequest playingRequest) {
//        QuestionEntity questionEntity = questionRepository.findById(playingRequest.getQuestion()).orElseThrow(() -> {
//            throw new ResourceNotFoundException("question not found");
//        });
//        List<UserAnswerEntity> optionalUserAnswerEntity = userQuestionRepository.findUserQuestionEntityByUser_EmailAndQuestion_Id(playingRequest.getEmail(), playingRequest.getQuestion());
//        if (!optionalUserAnswerEntity.isEmpty()) {
//            return false;
//        } else {
//            List<AnswerEntity> answers = answerRepository.findAnswerEntitiesByQuestionId_IdAndTextIn(playingRequest.getQuestion(), playingRequest.getAnswers());
//            if (answers.isEmpty()) return false;
//            AccountEntity accountEntity = accountRepository.findAccountEntityByEmail(playingRequest.getEmail()).get();
//            List<UserAnswerEntity> userQuestionEntities = answers.stream().map(it -> {
//                UserAnswerEntity userQuestion = new UserAnswerEntity();
//                userQuestion.setScore(it.getScore());
//                return userQuestion;
//            }).toList();
//            answers.forEach(it -> it.addUserAnswers(userQuestionEntities));
//            accountEntity.addUserQuestion(userQuestionEntities);
//            questionEntity.addUserQuestion(userQuestionEntities);
//            answerRepository.saveAll(answers);
//            accountRepository.save(accountEntity);
//            questionRepository.save(questionEntity);
//            userQuestionRepository.saveAll(userQuestionEntities);
//            simpMessagingTemplate.convertAndSendToUser(playingRequest.getRoom() + "/"+ playingRequest.getQuestion(),"/playing",questionMapper.entityToDto(questionEntity));
//            return true;
//        }
//    }

//    @Override
//    public void removeAnswer(PlayingRequest playingRequest) {
//        List<UserAnswerEntity> userQuestionEntities = userQuestionRepository.findUserQuestionEntityByUser_EmailAndQuestion_Id(playingRequest.getEmail(), playingRequest.getQuestion());
//        QuestionEntity questionEntity = questionRepository.findById(playingRequest.getQuestion()).orElseThrow(() -> {
//            throw new ResourceInvalidException("Question invalid");
//        });
//        AccountEntity accountEntity = accountRepository.findAccountEntityByEmail(playingRequest.getEmail()).orElseThrow(() -> {
//            throw new ResourceInvalidException("account invalid");
//        });
//        userQuestionEntities.forEach(it -> {
//            questionEntity.removeUserQuestion(it);
//            accountEntity.removeUserQuestion(it);
//        });
//        accountRepository.save(accountEntity);
//        questionRepository.save(questionEntity);
//        userQuestionRepository.deleteAll(userQuestionEntities);
//        simpMessagingTemplate.convertAndSendToUser(playingRequest.getRoom() + "/" + playingRequest.getQuestion(), "/playing", questionMapper.entityToDto(questionEntity));
//    }


}
