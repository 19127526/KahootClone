package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PresentationDto {
    private long id;
    private String name;
    private String url;
//    private Date created;
    private String type;
    private boolean isPublic;
    private long isPresent;

    private String author;
    private List<QuestionDto> questions;
}
