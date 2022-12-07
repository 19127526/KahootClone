package com.example.backend.service.impl;

import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.mapper.QuestionMapper;
import com.example.backend.model.dto.QuestionDto;
import com.example.backend.model.entity.AnswerEntity;
import com.example.backend.model.entity.PresentationEntity;
import com.example.backend.model.entity.QuestionEntity;
import com.example.backend.model.entity.UserAnswerEntity;
import com.example.backend.model.request.CreateQuestionRequest;
import com.example.backend.model.request.PlayingRequest;
import com.example.backend.repository.*;
import com.example.backend.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionServiceImpl implements QuestionService {
    private final UserQuestionRepository userQuestionRepository;
    private final QuestionRepository questionRepository;
    private final AccountRepository accountRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final AnswerRepository answerRepository;
    private final QuestionMapper questionMapper;
    private final PresentationRepository presentationRepository;
    private static final String DESTINATION = "/playing";

    @Override
    public void deleteQuestion(QuestionDto questionDto) {
        questionRepository.deleteById(questionDto.getId());
    }

    @Override
    public QuestionEntity createQuestion(CreateQuestionRequest createQuestionRequest) {
        PresentationEntity presentation = presentationRepository.findById(createQuestionRequest.getPresentationId()).orElseThrow(() -> {
            throw new ResourceNotFoundException("slide not found");
        });
        QuestionEntity question = new QuestionEntity();
        question.setText(createQuestionRequest.getText());
        presentation.addQuestion(question);
        presentationRepository.save(presentation);
        return questionRepository.save(question);
    }

    @Override
    public QuestionEntity updateQuestion(QuestionDto questionDto) {
        return null;
    }

    @Override
    public QuestionEntity getDetail(long id) {
        return questionRepository.findById(id).orElseThrow(() -> {
            throw new ResourceNotFoundException("Question not found");
        });
    }

    @Override
    public Boolean choseAnswer(PlayingRequest playingRequest) {
        QuestionEntity questionEntity = questionRepository.findById(playingRequest.getQuestion()).orElseThrow(() -> {
            throw new ResourceNotFoundException("question not found");
        });
        // checking presentationEntity is closed ?
        PresentationEntity presentationEntity = questionEntity.getPresentation();
        if (presentationEntity.getIsPresent() == -1) throw new ResourceInvalidException("presentation is closed");

        List<UserAnswerEntity> optionalUserAnswerEntity = userQuestionRepository.findUserQuestionEntityByUserrAndQuestion(playingRequest.getEmail(), playingRequest.getQuestion());
        if (!optionalUserAnswerEntity.isEmpty()) {
            return false;
        } else {
            List<AnswerEntity> answers = answerRepository.findAnswerEntitiesByQuestionId_IdAndTextIn(playingRequest.getQuestion(), playingRequest.getAnswers());
            if (answers.isEmpty()) return false;
            accountRepository.findAccountEntityByEmail(playingRequest.getEmail()).orElseThrow(() -> {
                throw new ResourceNotFoundException("user not found");
            });
            ;
            List<UserAnswerEntity> userQuestionEntities = answers.stream().map(it -> {
                UserAnswerEntity result = new UserAnswerEntity();
                result.setUserr(playingRequest.getEmail());
                result.setQuestion(playingRequest.getQuestion());
                return result;
            }).toList();
            answers.forEach(it -> it.addUserAnswers(userQuestionEntities));
            answerRepository.saveAll(answers);
            userQuestionRepository.saveAll(userQuestionEntities);
//            /slide/{keyPresentation}/playing
            simpMessagingTemplate.convertAndSendToUser(String.valueOf(presentationEntity.getId()), DESTINATION, questionMapper.entityToDto(questionEntity));
            return true;
        }
    }

    @Override
    public QuestionEntity nextSlide(long slideId) {
        QuestionEntity question = questionRepository.findById(slideId).orElseThrow(() -> {
            throw new ResourceNotFoundException("slide not found");
        });
        PresentationEntity presentationEntity = question.getPresentation();
        if (presentationEntity.getIsPresent() == -1) throw new ResourceInvalidException("presentation is stopped");
        presentationEntity.setIsPresent(slideId);
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(presentationEntity.getId()),DESTINATION, questionMapper.entityToDto(question));
        presentationRepository.save(presentationEntity);
        return question;
    }

    @Override
    public QuestionEntity connect(long presentationId) {
        PresentationEntity presentation =  presentationRepository.findById(presentationId).orElseThrow(() -> {
            throw new ResourceNotFoundException("presentation not found");
        });
        if(presentation.getIsPresent() == -1) throw new ResourceInvalidException("presentation is stopped");
        return questionRepository.findById(presentation.getIsPresent()).orElseThrow(() -> {
            throw new ResourceNotFoundException("slide not found");
        });
    }
}
