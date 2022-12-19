package com.example.backend.model.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GroupRequest {
    private String email;
    private String nameGroup;
    private String code;
    private Long id;

    @Override
    public String toString() {
        return "GroupRequest{" +
                "email='" + email + '\'' +
                ", nameGroup='" + nameGroup + '\'' +
                ", code='" + code + '\'' +
                ", id=" + id +
                '}';
    }

}
