package com.example.backend.model.request;

import com.example.backend.common.model.ActionPayload;
import com.example.backend.common.model.PresentationStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class InteractPresentRequest {
    private List<Long> votes;
    private Long presentId;
    private Long presentationId;
    private PresentationStatus mode;
    private Long slideId;
    private Long groupId;
    private String email;
    private ActionPayload action;

    private String question;
    private Long questionId;
}
