package com.example.backend.model.request;

import com.example.backend.common.model.PresentationStatus;
import lombok.Data;

import java.util.List;

@Data
public class InteractPresentRequest {
    private List<Long> votes;
    private Long presentationId;
    private PresentationStatus mode;
    private Long slideId;
    private Long groupId;
    private String email;
}
