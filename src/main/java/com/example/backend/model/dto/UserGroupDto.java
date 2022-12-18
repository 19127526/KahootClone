package com.example.backend.model.dto;

import com.example.backend.common.model.Role;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class UserGroupDto {
    private long id;
    private long group;
    private Date joinOn;

    private String email;
    private String userName;
    private String imageURL;
    private Role role;
}
