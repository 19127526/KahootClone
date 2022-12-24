package com.example.backend.model.dto;

import com.example.backend.common.model.GenreQuestion;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
//@Builder
public class SlideDto {
    private long id;
    private String text;
    private String heading;
    private GenreQuestion genreQuestion;
    private String imageURL;
    private long presentation;
    private List<VoteDto> votes;

    private MultipartFile imageFile;
}
