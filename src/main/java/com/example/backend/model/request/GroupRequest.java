package com.example.backend.model.request;

import com.example.backend.common.model.Role;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GroupRequest {
    private String email;
    private String nameGroup;
    private String code;
    private Long id;

    private String emailAssigned;
    private String emailRemoved;
    private Role role;
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
