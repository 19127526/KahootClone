package com.example.backend.controller;

import com.example.backend.mapper.PresentationMapper;
import com.example.backend.model.dto.PresentationDto;
import com.example.backend.model.request.CreatePresentationRequest;
import com.example.backend.service.PresentationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("presentation")
public class PresentationController {
    private final PresentationService presentationService;
    private final PresentationMapper presentationMapper;

    @PostMapping("add")
    public ResponseEntity<PresentationDto> addPresentation(@RequestBody CreatePresentationRequest createPresentationRequest) {
        System.out.println(createPresentationRequest.toString());
        return ResponseEntity.status(HttpStatus.CREATED).body(presentationMapper.entityToDto(presentationService.addPresentation(createPresentationRequest)));
    }

//    @PostMapping("update")
//    public ResponseEntity<PresentationDto> updatePresentation(@RequestBody PresentationDto presentationDto) {
//        return ResponseEntity.status(HttpStatus.ACCEPTED).body(presentationMapper.entityToDto(presentationService.updatePresentation(presentationDto)));
//    }

    @PostMapping("delete")
    public ResponseEntity<Object> deletePresentation(@RequestBody PresentationDto presentationDto) {
        presentationService.deletePresentation(presentationDto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    @GetMapping("details")
    public ResponseEntity<PresentationDto> getDetail(long id) {
        return ResponseEntity.status(HttpStatus.OK).body(presentationMapper.entityToDto(presentationService.getDetail(id)));
    }

    @GetMapping("list/group")
    public ResponseEntity<List<PresentationDto>> getPresentations(long id, boolean isPublic) {
        return ResponseEntity.status(HttpStatus.OK).body(presentationService.getList(id, isPublic).stream().map(presentationMapper::entityToDto).toList());
    }
}
