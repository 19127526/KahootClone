package com.example.backend.model.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GroupRequest {
    private String email;
    private String name_group;
    private String code;
    private Long id;
}
