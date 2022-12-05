package com.example.backend.model.request;

import lombok.Data;

import java.util.List;

@Data
public class PlayingRequest {
    private List<String> answers;
    private String room;
    private long question;
    private String email;
}
