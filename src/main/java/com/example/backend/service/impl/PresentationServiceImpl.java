package com.example.backend.service.impl;

import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.dto.PresentationDto;
import com.example.backend.model.entity.AccountEntity;
import com.example.backend.model.entity.GroupEntity;
import com.example.backend.model.entity.PresentationEntity;
import com.example.backend.model.request.CreatePresentationRequest;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.GroupRepository;
import com.example.backend.repository.PresentationRepository;
import com.example.backend.service.PresentationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PresentationServiceImpl implements PresentationService {
    private final PresentationRepository presentationRepository;
    private final AccountRepository accountRepository;
    private final GroupRepository groupRepository;

    @Override
    public void deletePresentation(PresentationDto presentationDto) {
        presentationRepository.deleteById(presentationDto.getId());
    }

    @Override
    public PresentationEntity updatePresentation(PresentationDto presentationDto) {
        return null;
    }

    @Override
    public PresentationEntity addPresentation(CreatePresentationRequest present) {
        AccountEntity accountEntity = accountRepository.findAccountEntityByEmail(present.getEmail()).orElseThrow(() -> {
            throw new ResourceInvalidException("account invalid");
        });
//        presentationRepository.findPresentationEntityByGroup_IdAndName(present.getGroupId(), present.getName()).orElseThrow(() -> {
//            throw new ResourceInvalidException("presentation name exist");
//        });
        GroupEntity group = groupRepository.findById(present.getGroupId()).orElseThrow(() -> {
            throw new ResourceInvalidException("group invalid");
        });
        PresentationEntity presentation = new PresentationEntity();
        presentation.setName(present.getName());
        presentation.setIsPublic(present.isPublic());
        accountEntity.addPresentation(presentation);
        group.addPresentation(presentation);
        accountRepository.save(accountEntity);
        groupRepository.save(group);
        return presentationRepository.save(presentation);
    }

    @Override
    public List<PresentationEntity> getList(long id, boolean isPublic) {
        return presentationRepository.findPresentationEntitiesByGroup_IdAndIsPublic(id,isPublic);
    }

    @Override
    public PresentationEntity getDetail(long id) {
        return presentationRepository.findById(id).orElseThrow(() -> {
            throw new ResourceNotFoundException("presentation not found");
        });
    }
}
