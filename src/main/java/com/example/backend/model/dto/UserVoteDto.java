package com.example.backend.model.dto;

import lombok.Data;

@Data
//@Builder
public class UserVoteDto {
    private long id;
    private long slide;
    private Long userId;
    private String vote;
}
