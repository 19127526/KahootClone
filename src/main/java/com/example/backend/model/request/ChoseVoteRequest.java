package com.example.backend.model.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ChoseVoteRequest {
    private List<Long> votes;
    private long slide;
    private String email;
}
