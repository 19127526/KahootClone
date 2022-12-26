package com.example.backend.model.dto;

import com.example.backend.common.model.GenreQuestion;
import lombok.Data;

import java.util.List;

@Data
public class PresentDto {
    private long id;
    private long presentationId;
    private long slideId;
    private String text;
    private String heading;
    private GenreQuestion genreQuestion;
    private String imageURL;
    private List<VoteDto> votes;
}
