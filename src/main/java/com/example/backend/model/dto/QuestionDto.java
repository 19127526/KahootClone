package com.example.backend.model.dto;

import com.example.backend.common.model.GenreQuestion;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
public class QuestionDto {
    private long id;
    private GenreQuestion genreQuestion;
    private String text;
    private String imageUrl;
    private long presentation;
    private MultipartFile imageFile;
    private List<AnswerDto> answers;
}
