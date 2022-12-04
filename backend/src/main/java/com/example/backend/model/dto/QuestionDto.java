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
    private String room;
    private String text;
//    private Integer score;
    private MultipartFile imageFile;
    private String imageUrl;
//    private Double percentCorrect;
    private List<AnswerDto> answers;
    private List<UserQuestionDto> userQuestions;
}
