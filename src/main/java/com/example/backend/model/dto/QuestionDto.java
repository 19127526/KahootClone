package com.example.backend.model.dto;

import lombok.Data;

import java.util.Date;

@Data
public class QuestionDto {
    private long id;

    private long slideId;
    private long presentId;
    private long like;
    private String text;
    private Boolean isAnswer;
    private String email;
    private Date on;
}
