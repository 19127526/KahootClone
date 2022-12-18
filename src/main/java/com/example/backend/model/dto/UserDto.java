package com.example.backend.model.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Data
//@Builder
public class UserDto implements Serializable {
    private long id;
    private String userName;
    private String email;
    private String password;
    private String imageURL;

    private MultipartFile imageFile;
}
