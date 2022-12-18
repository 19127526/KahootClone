package com.example.backend.controller;

import com.example.backend.mapper.SlideMapper;
import com.example.backend.model.dto.SlideDto;
import com.example.backend.service.SlideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("slide")
public class SlideController {

    private final SlideService slideService;
    private final SlideMapper slideMapper;

    @GetMapping("detail")
    public ResponseEntity<SlideDto> getDetail(long id) {
        return ResponseEntity.status(HttpStatus.OK).body(slideService.detailSlide(id));
    }

    @PostMapping("add")
    public ResponseEntity<SlideDto> addQuestion(@RequestBody SlideDto slideDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(slideMapper.entityToDto(slideService.createSlide(slideDto)));
    }

    @PostMapping("delete")
    public ResponseEntity<Object> deleteQuestion(@RequestBody SlideDto slideDto) {
        slideService.deleteSlide(slideDto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    @PostMapping("update")
    public ResponseEntity<SlideDto> updateQuestion(@RequestBody SlideDto slideDto) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(slideMapper.entityToDto(slideService.updateSlide(slideDto)));
    }
}
