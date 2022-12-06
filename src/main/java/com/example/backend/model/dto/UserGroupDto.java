package com.example.backend.model.dto;

import com.example.backend.common.model.Role;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserGroupDto {
    private long id;

    private String email;
    private String userName;
    private String imageURL;

    private long group;

    private Role role;
//    private Integer score;
}
