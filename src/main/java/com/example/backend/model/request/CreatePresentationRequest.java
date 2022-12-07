package com.example.backend.model.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class CreatePresentationRequest {
    long groupId;
    private String name;
    private String email;
    private Boolean isPublic;

    @Override
    public String toString() {
        return "CreatePresentationRequest{" +
                "groupId=" + groupId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", isPublic=" + isPublic +
                '}';
    }
}
