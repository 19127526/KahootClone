package com.example.backend.model.dto;

import com.example.backend.common.model.PresentationStatus;
import lombok.Data;

import java.util.Date;

@Data
public class PresentHistoryDto {
    private long id;
    private long userId;
    private Date startOn;
    private Boolean presented;
    private PresentationStatus mode;
}
