package com.example.backend.model.request;

import lombok.Data;

@Data
public class CreatePresentationRequest {
    long groupId;
    private String name;
    private String email;

    @Override
    public String toString() {
        return "CreatePresentationRequest{" +
                "GroupId=" + groupId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
