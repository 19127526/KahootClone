package com.example.backend.service.impl;

import com.example.backend.common.model.RolePresentation;
import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.mapper.PresentationMapper;
import com.example.backend.mapper.SlideMapper;
import com.example.backend.model.dto.PresentationDto;
import com.example.backend.model.dto.SlideDto;
import com.example.backend.model.entity.PresentationEntity;
import com.example.backend.model.entity.UserEntity;
import com.example.backend.model.entity.UserPresentationEntity;
import com.example.backend.model.request.PresentationRequest;
import com.example.backend.repository.PresentationRepository;
import com.example.backend.repository.SlideRepository;
import com.example.backend.repository.UserPresentationRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.PresentationService;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PresentationServiceImpl implements PresentationService {
    private final PresentationRepository presentationRepository;
    private final SlideRepository slideRepository;
    private final UserRepository userRepository;
    private final SlideMapper slideMapper;
    private final PresentationMapper presentationMapper;
    private final UserPresentationRepository userPresentationRepository;

    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public PresentationDto getDetail(long id, String email) {
        Tuple userPresentation = userPresentationRepository.getUserAndPresentationWithRole(email, id, List.of(RolePresentation.OWNER, RolePresentation.Co_LAB)).orElseThrow(() -> {
            throw new ResourceNotFoundException("presentation not found");
        });
        PresentationEntity presentation = (PresentationEntity) userPresentation.toArray()[1];
        List<SlideDto> slides = slideRepository.findByPresentation_Id(id).stream().map(slideMapper::entityToDto).toList();
        PresentationDto presentationDto = presentationMapper.entityToDto(presentation);
        presentationDto.setSlides(slides);
        presentationDto.setAuthor(presentation.getAuthor().getEmail());
        return presentationDto;
    }

    @Override
    public PresentationEntity addPresentation(PresentationRequest presentationRequest) {
        UserEntity user = userRepository.findAccountEntityByEmail(presentationRequest.getEmail()).orElseThrow(() -> {
            throw new ResourceInvalidException("account invalid");
        });
        PresentationEntity presentation = new PresentationEntity();
        presentation.setName(presentationRequest.getNamePresentation());
        presentation.addCollaborate(user,RolePresentation.OWNER);
        presentation = presentationRepository.save(presentation);
        user.addPresentationCreated(presentation);
        userRepository.save(user);
        return presentation;
    }

    @Override
    public void deletePresentation(PresentationRequest presentationRequest) {
        userPresentationRepository.getUserAndPresentationWithRole(presentationRequest.getEmail(),presentationRequest.getId(),List.of(RolePresentation.OWNER)).orElseThrow(() -> {
            throw new ResourceInvalidException("Permission denied");
        });
        presentationRepository.deleteById(presentationRequest.getId());
    }

    @Override
    public Boolean clearAdvanced(PresentationRequest presentationRequest) {
        return null;
    }

    @Override
    public void inviteCollaborate(PresentationRequest presentationRequest) {
        UserEntity userInvited = userRepository.findAccountEntityByEmail(presentationRequest.getEmailInvited()).orElseThrow(() -> {
            throw new ResourceInvalidException("email not exist");
        });
        if (userPresentationRepository.findUserPresentationEntityByUsers_EmailAndPresentation_Id(presentationRequest.getEmailInvited(), presentationRequest.getId()).isPresent()) {
            throw new ResourceInvalidException("user was collaborate in presentation");
        }
        Tuple userPresentation = userPresentationRepository.getUserAndPresentationWithRole(presentationRequest.getEmail(), presentationRequest.getId(), List.of(RolePresentation.OWNER)).orElseThrow(() -> {
            throw new ResourceInvalidException("Permission denied");
        });
        PresentationEntity presentation = (PresentationEntity) userPresentation.toArray()[1];
        presentation.addCollaborate(userInvited, RolePresentation.PENDING);
        presentationRepository.save(presentation);
    }

    @Override
    public void removeCollaborate(PresentationRequest presentationRequest) {
        userPresentationRepository.getUserAndPresentationWithRole(presentationRequest.getEmail(), presentationRequest.getId(), List.of(RolePresentation.OWNER)).orElseThrow(() -> {
            throw new ResourceInvalidException("Permission denied");
        });
        Tuple userPresentation = userPresentationRepository.getUserAndPresentationWithRole(presentationRequest.getEmailRemoved(), presentationRequest.getId(), List.of(RolePresentation.Co_LAB, RolePresentation.PENDING)).orElseThrow(() -> {
            throw new ResourceInvalidException("Collaborate not in presentation");
        });
        PresentationEntity presentation = (PresentationEntity) userPresentation.toArray()[1];
        presentation.removeCollaborate((UserEntity) userPresentation.toArray()[0]);
        presentationRepository.save(presentation);
    }

    @Override
    public void acceptPending(PresentationRequest presentationRequest) {
        UserPresentationEntity userPresentation = userPresentationRepository.findUserPresentationEntityByUsers_EmailAndPresentation_IdAndRole(presentationRequest.getEmail(), presentationRequest.getId(), RolePresentation.PENDING).orElseThrow(() -> {
            throw new ResourceInvalidException("you not in pending");
        });
        userPresentation.setRole(RolePresentation.Co_LAB);
        userPresentationRepository.save(userPresentation);
    }

    @Override
    public void rejectPending(PresentationRequest presentationRequest) {
        Tuple userPresentation = userPresentationRepository.getUserAndPresentationWithRole(presentationRequest.getEmail(), presentationRequest.getId(), List.of(RolePresentation.PENDING)).orElseThrow(() -> {
            throw new ResourceInvalidException("you not in pending");
        });
        PresentationEntity presentation = (PresentationEntity) userPresentation.toArray()[1];
        presentation.removeCollaborate((UserEntity) userPresentation.toArray()[0]);
        presentationRepository.save(presentation);
    }

    @Override
    public List<PresentationDto> getListJoin(String email) {
        return userPresentationRepository.getListPresentationsAndOwnerWithRole(email, List.of(RolePresentation.OWNER, RolePresentation.Co_LAB)).stream().map(tuple -> {
            PresentationDto presentationDto = presentationMapper.entityToDto((PresentationEntity) tuple.toArray()[0]);
            presentationDto.setAuthor(((UserEntity) tuple.toArray()[1]).getEmail());
            return presentationDto;
        }).toList();
    }

    @Override
    public List<PresentationDto> getListPending(String email) {
        return userPresentationRepository.getListPresentationsAndOwnerWithRole(email, List.of(RolePresentation.PENDING)).stream().map(tuple -> {
            PresentationDto presentationDto = presentationMapper.entityToDto((PresentationEntity) tuple.toArray()[0]);
            presentationDto.setAuthor(((UserEntity) tuple.toArray()[1]).getEmail());
            return presentationDto;
        }).toList();
    }

    @Override
    public PresentationEntity updatePresentation(PresentationDto presentationDto) {
        return null;
    }
}
