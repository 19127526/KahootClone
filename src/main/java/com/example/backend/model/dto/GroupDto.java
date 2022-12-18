package com.example.backend.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
//@Builder
public class GroupDto {
    private long id;
    private String name;
    private String description;
    private String code;
    /////////////////////
    private long present;
    // email
    private String created;
    private List<UserGroupDto> users;
}
