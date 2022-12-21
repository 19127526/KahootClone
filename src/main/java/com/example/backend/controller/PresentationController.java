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
    public ResponseEntity<PresentationDto> getDetail(long id, String email) {
        return ResponseEntity.status(HttpStatus.OK).body(presentationService.getDetail(id, email));
    }

    @PostMapping("add")
    public ResponseEntity<PresentationDto> addPresentation(@RequestBody PresentationRequest presentationRequest) {
        PresentationDto presentation = presentationMapper.entityToDto(presentationService.addPresentation(presentationRequest));
        presentation.setAuthor(presentationRequest.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(presentation);
    }

    @PostMapping("delete")
    public ResponseEntity<Object> deletePresentation(@RequestBody PresentationRequest presentationRequest) {
        presentationService.deletePresentation(presentationRequest);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    @PostMapping("invite")
    public ResponseEntity<Object> inviteCollaborate(@RequestBody PresentationRequest presentationRequest) {
        presentationService.inviteCollaborate(presentationRequest);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
    }

    @PostMapping("remove")
    public ResponseEntity<Object> removeCollaborate(@RequestBody PresentationRequest presentationRequest) {
        presentationService.removeCollaborate(presentationRequest);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    @PostMapping("acceptPending")
    public ResponseEntity<Object> acceptPending(@RequestBody PresentationRequest presentationRequest) {
        presentationService.acceptPending(presentationRequest);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
    }

    @PostMapping("rejectPending")
    public ResponseEntity<Object> rejectPending(@RequestBody PresentationRequest presentationRequest) {
        presentationService.rejectPending(presentationRequest);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
    }


    @PostMapping("update/clearAdvanced")
    public ResponseEntity<Boolean> clearAdvanced(@RequestBody PresentationRequest presentationRequest) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(presentationService.clearAdvanced(presentationRequest));
    }
}
