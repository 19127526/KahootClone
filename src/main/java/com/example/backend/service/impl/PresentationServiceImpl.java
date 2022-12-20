package com.example.backend.service.impl;

import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.mapper.PresentationMapper;
import com.example.backend.mapper.SlideMapper;
import com.example.backend.model.dto.PresentationDto;
import com.example.backend.model.dto.SlideDto;
import com.example.backend.model.entity.PresentationEntity;
import com.example.backend.model.entity.UserEntity;
import com.example.backend.model.request.PresentationRequest;
import com.example.backend.repository.PresentationRepository;
import com.example.backend.repository.SlideRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.PresentationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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

    @Override
    public PresentationDto getDetail(long id, String email) {
        PresentationEntity presentation = presentationRepository.findPresentationEntityByAuthor_EmailAndId(email, id).orElseThrow(() -> {
            throw new ResourceNotFoundException("presentation not found");
        });
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
        user.addPresentation(presentation);
        PresentationEntity presentationEntity = presentationRepository.save(presentation);
        userRepository.save(user);
        return presentationEntity;
    }

    @Override
    public void deletePresentation(PresentationRequest presentationRequest) {
        presentationRepository.deleteById(presentationRequest.getId());
    }

    @Override
    public Boolean clearAdvanced(PresentationRequest presentationRequest) {
        return null;
    }

    @Override
    public PresentationEntity updatePresentation(PresentationDto presentationDto) {
        return null;
    }
}
