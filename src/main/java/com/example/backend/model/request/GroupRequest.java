package com.example.backend.model.request;

import lombok.Data;

@Data
public class GroupRequest {
    private String email;
    private String name_group;
    private String code;
    private Long id;
}
