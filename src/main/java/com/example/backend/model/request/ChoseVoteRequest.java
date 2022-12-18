package com.example.backend.model.request;

import lombok.Data;

import java.util.List;

@Data
public class ChoseVoteRequest {
    private List<Long> votes;
    private long slide;
    private String email;
}
