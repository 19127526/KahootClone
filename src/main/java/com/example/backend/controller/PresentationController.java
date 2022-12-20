package com.example.backend.controller;

import com.example.backend.common.controller.BaseController;
import com.example.backend.mapper.PresentationMapper;
import com.example.backend.model.dto.PresentationDto;
import com.example.backend.model.request.PresentationRequest;
import com.example.backend.service.PresentationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("presentation")
public class PresentationController extends BaseController {
    private final PresentationService presentationService;
    private final PresentationMapper presentationMapper;

    @GetMapping("details")
    public ResponseEntity<PresentationDto> getDetail(@RequestBody PresentationRequest presentationRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(presentationService.getDetail(presentationRequest));
    }

    @PostMapping("add")
    public ResponseEntity<PresentationDto> addPresentation(@RequestBody PresentationRequest presentationRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(presentationMapper.entityToDto(presentationService.addPresentation(presentationRequest)));
    }

    @PostMapping("delete")
    public ResponseEntity<Object> deletePresentation(@RequestBody PresentationRequest presentationRequest) {
        presentationService.deletePresentation(presentationRequest);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }


    @PostMapping("update/clearAdvanced")
    public ResponseEntity<Boolean> clearAdvanced(@RequestBody PresentationRequest presentationRequest) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(presentationService.clearAdvanced(presentationRequest));
    }
}
