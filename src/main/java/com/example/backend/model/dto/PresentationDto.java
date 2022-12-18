package com.example.backend.model.dto;

import com.example.backend.common.model.PresentationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
//@Builder
public class PresentationDto {
    private long id;
    private String name;
//    private String url;
    private PresentationStatus status;
    private long currentSlide;
    //////////////////
    private long inGroup;
    //    private Date created;
    private String author;
    private List<SlideDto> slides;
}
