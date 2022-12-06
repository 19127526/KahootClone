package com.example.backend.service;

import com.example.backend.model.request.PlayingRequest;

public interface PlayService {
//    void nextQuestion(ChoseRequest choseRequest);
    boolean choseAnswer(PlayingRequest playingRequest);
    void removeAnswer(PlayingRequest playingRequest);
}
