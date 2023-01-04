package com.example.backend.service.impl;

import com.example.backend.common.model.GenreQuestion;
import com.example.backend.common.model.RolePresentation;
import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.mapper.SlideMapper;
import com.example.backend.mapper.VoteMapper;
import com.example.backend.model.dto.SlideDto;
import com.example.backend.model.dto.VoteDto;
import com.example.backend.model.entity.PresentationEntity;
import com.example.backend.model.entity.SlideEntity;
import com.example.backend.repository.PresentationRepository;
import com.example.backend.repository.SlideRepository;
import com.example.backend.repository.UserPresentationRepository;
import com.example.backend.repository.VoteRepository;
import com.example.backend.service.SlideService;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SlideServiceImpl implements SlideService {
    private final SlideRepository slideRepository;
    private final PresentationRepository presentationRepository;
    private final VoteRepository voteRepository;
    private final SlideMapper slideMapper;
    private final VoteMapper voteMapper;
    private final UserPresentationRepository userPresentationRepository;

    @Override
    public SlideDto detailSlide(long id) {
        SlideEntity slide = slideRepository.findById(id).orElseThrow(() -> {
            throw new ResourceNotFoundException("Question not found");
        });
        SlideDto slideDto = slideMapper.entityToDto(slide);
        if (slide.getGenreQuestion() != GenreQuestion.DOCUMENT) {
            List<VoteDto> votes = voteRepository.findVoteEntitiesBySlide_Id(slide.getId()).stream().map(voteMapper::entityToDto).toList();
            slideDto.setVotes(votes);
        }
        return slideDto;
    }

    @Override
    public void deleteSlide(SlideDto slideDto) {
        Tuple userPresentation = userPresentationRepository.getUserAndPresentationWithRole(slideDto.getEmail(), slideDto.getPresentation(), List.of(RolePresentation.OWNER, RolePresentation.Co_LAB)).orElseThrow(() -> {
            throw new ResourceNotFoundException("permission denied");
        });
        SlideEntity slide = slideRepository.findById(slideDto.getId()).orElseThrow(() -> {
            throw new ResourceInvalidException("slide not found");
        });
        PresentationEntity presentation = (PresentationEntity) userPresentation.toArray()[1];
        presentation.removeSlide(slide);
        presentationRepository.save(presentation);
        slideRepository.delete(slide);
    }

    @Override
    public SlideEntity createSlide(SlideDto slideDto) {
        Tuple userPresentation = userPresentationRepository.getUserAndPresentationWithRole(slideDto.getEmail(), slideDto.getPresentation(), List.of(RolePresentation.OWNER, RolePresentation.Co_LAB)).orElseThrow(() -> {
            throw new ResourceInvalidException("permission denied");
        });
        PresentationEntity presentation = (PresentationEntity) userPresentation.toArray()[1];
        SlideEntity slide = new SlideEntity();
        slide.setText(slideDto.getText());
        slide.setHeading(slideDto.getHeading());
        slide.setGenreQuestion(slideDto.getGenreQuestion());
        presentation.addSlide(slide);
        presentationRepository.save(presentation);
        return slideRepository.save(slide);
    }

    @Override
    public SlideEntity updateSlide(SlideDto slideDto) {
        Tuple userPresentation = userPresentationRepository.getUserAndPresentationWithRole(slideDto.getEmail(), slideDto.getPresentation(), List.of(RolePresentation.OWNER, RolePresentation.Co_LAB)).orElseThrow(() -> {
            throw new ResourceInvalidException("permission denied");
        });
        SlideEntity question = slideRepository.findById(slideDto.getId()).orElseThrow(() -> {
            throw new ResourceNotFoundException("slide not found");
        });
        if (question.getPresentation().getId() != ((PresentationEntity) userPresentation.toArray()[1]).getId()) {
            throw new ResourceInvalidException("slide invalid");
        }
        question.setText(slideDto.getText());
        question.setHeading(slideDto.getHeading());
        return slideRepository.save(question);
    }
}
