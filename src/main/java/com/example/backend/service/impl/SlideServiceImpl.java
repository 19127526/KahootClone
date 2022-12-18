package com.example.backend.service.impl;

import com.example.backend.common.model.GenreQuestion;
import com.example.backend.common.model.PresentationStatus;
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
import com.example.backend.repository.VoteRepository;
import com.example.backend.service.SlideService;
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
        slideRepository.deleteById(slideDto.getId());
    }

    @Override
    public SlideEntity createSlide(SlideDto slideDto) {
        PresentationEntity presentation = presentationRepository.findById(slideDto.getPresentation()).orElseThrow(() -> {
            throw new ResourceNotFoundException("slide not found");
        });
        SlideEntity question = new SlideEntity();
        question.setText(slideDto.getText());
        presentation.addSlide(question);
        presentationRepository.save(presentation);
        return slideRepository.save(question);
    }

    @Override
    public SlideEntity updateSlide(SlideDto slideDto) {
        SlideEntity question = slideRepository.findById(slideDto.getId()).orElseThrow(() -> {
            throw new ResourceNotFoundException("slide not found");
        });
        PresentationEntity presentation = question.getPresentation();
        if (presentation.getStatus() != PresentationStatus.IDLE)
            throw new ResourceInvalidException("presentation is running");
        question.setText(slideDto.getText());
        return slideRepository.save(question);
    }
}
