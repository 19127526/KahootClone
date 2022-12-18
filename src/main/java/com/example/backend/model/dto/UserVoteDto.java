package com.example.backend.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
//@Builder
public class UserVoteDto {
    private long id;
    private long slide;
    private String users;
    private String vote;
}
