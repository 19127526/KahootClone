package com.example.backend.model.dto;

import com.example.backend.model.entity.UserGroupEntity;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;

@Data
public class AccountDto implements Serializable {
    private long id;
    private String userName;
    private String email;
    private String password;
    private String imageURL;
    private MultipartFile imageFile;
    private List<UserGroupDto> userGroup;
    private List<GroupDto> groups;
    private List<PresentationDto> presentations;
}
