package com.example.backend.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
public class GroupDto {
    private long id;
    private String name;
    private String description;
    private String url;
    private String code;
    private String created;
    private List<PresentationDto> presentations;
    private List<UserGroupDto> userGroup;
}
