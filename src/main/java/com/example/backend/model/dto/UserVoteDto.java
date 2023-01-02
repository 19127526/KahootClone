package com.example.backend.model.dto;

import lombok.Data;

import java.util.Date;

@Data
//@Builder
public class UserVoteDto {
    private long id;
    private long slide;
    private String email;
    private String vote;
    private Date voteOn;
}
