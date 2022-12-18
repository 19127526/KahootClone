package com.example.backend.service.impl;

import com.example.backend.common.model.ActionPayload;
import com.example.backend.common.model.PresentationStatus;
import com.example.backend.common.model.Role;
import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.mapper.ChatMapper;
import com.example.backend.model.entity.*;
import com.example.backend.model.request.ChatRequest;
import com.example.backend.model.request.InteractPresentRequest;
import com.example.backend.repository.*;
import com.example.backend.service.RealTimeService;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class RealTimeServiceImpl implements RealTimeService {

    private static final String topic = "/presentation";
    private final SlideRepository slideRepository;
    private final VoteRepository voteRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final PresentationRepository presentationRepository;
    private final UserGroupRepository userGroupRepository;
    private final GroupRepository groupRepository;
    private final ChatMapper chatMapper;
    private final ChatRepository chatRepository;

    @Override
    public void choseVote(InteractPresentRequest interact) {
        if (interact.getVotes().isEmpty()) throw new ResourceInvalidException("please chose vote");
        Tuple slideAndPresent = slideRepository.getSlideAndPresentation(interact.getSlideId(), interact.getPresentationId()).orElseThrow(() -> {
            throw new ResourceInvalidException("chose vote invalid");
        });
        SlideEntity slide = (SlideEntity) slideAndPresent.toArray()[0];
        PresentationEntity presentation = (PresentationEntity) slideAndPresent.toArray()[1];
        List<VoteEntity> votes = voteRepository.findVotesExistInListId(interact.getVotes());
        switch (presentation.getStatus()) {
            case IDLE -> throw new ResourceInvalidException("presentation is closed");
            case PRIVATE -> {
                if (interact.getEmail() == null) throw new ResourceInvalidException("please login to vote");
                else {
                    UserEntity user = userRepository.findUserFromGroup(interact.getEmail(), presentation.getInGroup()).orElseThrow(() -> {
                        throw new ResourceInvalidException("this account have not joined group yet");
                    });
                    votes.forEach(it -> it.addUser(user));
                    voteRepository.saveAll(votes);
                    simpMessagingTemplate.convertAndSendToUser(String.valueOf(presentation.getId()), topic, getPayloadSlide(slide, ActionPayload.UPDATE_SLIDE));
                }
            }
            case PUBLIC -> {
                votes.forEach(it -> it.addUser(null));
                voteRepository.saveAll(votes);
            }
        }
    }

    @Override
    public SlideEntity connect(InteractPresentRequest interact) {
        Tuple currentPresent = presentationRepository.getCurrentSlideAndPresentation(interact.getPresentationId()).orElseThrow(() -> {
            throw new ResourceInvalidException("presentation is closed");
        });
        PresentationEntity presentation = (PresentationEntity) currentPresent.toArray()[1];
        switch (presentation.getStatus()) {
            case PRIVATE -> {
                if (interact.getGroupId() == null || interact.getEmail() == null) {
                    throw new ResourceInvalidException("Permission denied");
                }
                userGroupRepository.findUserGroupEntityByGroup_IdAndUsers_Email(interact.getGroupId(), interact.getEmail()).orElseThrow(() -> {
                    throw new ResourceInvalidException("Permission denied");
                });
            }
            case IDLE -> throw new ResourceInvalidException("presentation is end");
        }
        return (SlideEntity) currentPresent.toArray()[0];
    }

    @Override
    public void nextSlide(InteractPresentRequest interact) {
        Tuple slidePresent = presentationRepository.getSlideAndPresentation(interact.getSlideId(), interact.getPresentationId()).orElseThrow(() -> {
            throw new ResourceInvalidException("next slide invalid");
        });
        PresentationEntity presentation = (PresentationEntity) slidePresent.toArray()[1];
        switch (presentation.getStatus()) {
            case PUBLIC -> {
                if (!presentation.getAuthor().getEmail().equals(interact.getEmail())) {
                    throw new ResourceInvalidException("permission denied");
                }
            }
            case PRIVATE ->
                    userRepository.getUserAndGroupWithRoles(interact.getEmail(), interact.getGroupId(), List.of(Role.OWNER, Role.Co_OWNER)).orElseThrow(() -> {
                        throw new ResourceInvalidException("permission denied");
                    });
            case IDLE -> throw new ResourceInvalidException("presentation is end");
        }
        SlideEntity slide = (SlideEntity) slidePresent.toArray()[0];
        presentation.setCurrentSlide(slide.getId());
        presentationRepository.save(presentation);
        HashMap<String, Object> payload = getPayloadSlide(slide, ActionPayload.CHANGE_SLIDE);
        payload.put("user_change_slide", interact.getEmail());
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(presentation.getId()), topic, payload);
    }

    @Override
    public PresentationEntity startPresent(InteractPresentRequest interact) {
        PresentationEntity presentation = presentationRepository.findById(interact.getPresentationId()).orElseThrow(() -> {
            throw new ResourceNotFoundException("presentation not found");
        });
        if (presentation.getStatus() != PresentationStatus.IDLE) {
            throw new ResourceInvalidException("presentation is presented");
        } else {
            List<SlideEntity> slides = presentation.getSlides();
            if (slides.isEmpty()) {
                throw new ResourceInvalidException("please created slide to present");
            }
            if (interact.getEmail() == null) {
                throw new ResourceInvalidException("email invalid");
            }
            if (interact.getMode() == PresentationStatus.PRIVATE) {
                if (interact.getGroupId() == null) throw new ResourceInvalidException("group invalid");
                Tuple userGroup = userRepository.getUserAndGroupWithRoles(interact.getEmail(), interact.getGroupId(), List.of(Role.OWNER, Role.Co_OWNER)).orElseThrow(() -> {
                    throw new ResourceInvalidException("permission denied");
                });
                GroupEntity group = (GroupEntity) userGroup.toArray()[1];
                if (group.getPresent() != -1) {
                    throw new ResourceInvalidException("Group is presented");
                }
                presentation.setStatus(PresentationStatus.PRIVATE);
                presentation.setInGroup(group.getId());
                group.setPresent(presentation.getId());
                groupRepository.save(group);
            } else {
                presentation.setStatus(PresentationStatus.PUBLIC);
            }
            presentation.setCurrentSlide(slides.get(0).getId());
            presentation = presentationRepository.save(presentation);
            if (interact.getMode() == PresentationStatus.PRIVATE) {
                HashMap<String, Object> payload = new HashMap<>();
                payload.put("action", ActionPayload.START_PRESENTATION);
                payload.put("presentation", presentation.getId());
                payload.put("group", interact.getGroupId());
                simpMessagingTemplate.convertAndSendToUser(String.valueOf(interact.getGroupId()), topic, payload);
            }
            return presentation;
        }
    }

    @Override
    public void stopPresent(InteractPresentRequest interact) {
        PresentationEntity presentation = presentationRepository.findById(interact.getPresentationId()).orElseThrow(() -> {
            throw new ResourceNotFoundException("presentation not found");
        });
        switch (presentation.getStatus()) {
            case IDLE -> throw new ResourceInvalidException("presentation not running");
            case PRIVATE -> {
                GroupEntity group = groupRepository.findById(interact.getGroupId()).orElseThrow(() -> {
                    throw new ResourceInvalidException("group not found");
                });
                if (group.getPresent() != presentation.getId()) {
                    throw new ResourceInvalidException("presentation and group dont match");
                }
                group.setPresent(-1);
                presentation.setInGroup(-1);
                groupRepository.save(group);
            }
        }
        presentation.setStatus(PresentationStatus.IDLE);
        presentation.setCurrentSlide(-1);
        // if save fail group will rollback
        presentationRepository.save(presentation);
        HashMap<String, Object> payload = new HashMap<>();
        payload.put("action", ActionPayload.STOP_PRESENTATION);
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(presentation.getId()), topic, payload);

    }

    @Override
    public void sendMessage(ChatRequest chatRequest) {
        PresentationEntity presentation = presentationRepository.findById(chatRequest.getPresentation()).orElseThrow(() -> {
            throw new ResourceInvalidException("chat fail");
        });
        ChatEntity chat = chatMapper.payloadToEntity(chatRequest);
        presentation.addChat(chat);
        chat = chatRepository.save(chat);
        presentationRepository.save(presentation);
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(chatRequest.getPresentation()), topic, getPayloadChat(chat, ActionPayload.CHAT));
    }

    private HashMap<String, Object> getPayloadSlide(SlideEntity slide, ActionPayload action) {
        HashMap<String, Object> payload = new HashMap<>();
        payload.put("action", action);
        payload.put("id_of_slide", slide.getId());
        payload.put("text_of_slide", slide.getText());
        payload.put("type_of_slide", slide.getGenreQuestion());
        payload.put("image_of_slide", slide.getImageURL());
        payload.put("votes_of_slide", getVotes(slide.getVotes()));
        return payload;
    }

    private HashMap<String, Object> getPayloadChat(ChatEntity chatEntity, ActionPayload action) {
        HashMap<String, Object> payload = new HashMap<>();
        payload.put("action", action);
        payload.put("sender", chatEntity.getSender());
        payload.put("mess", chatEntity.getMess());
        payload.put("presentation", chatEntity.getPresentation());
        return payload;
    }

    private List<Map<String, Object>> getVotes(List<VoteEntity> votes) {
        return votes.stream().map(vote -> {
            Map<String, Object> dataVote = new HashMap<>();
            dataVote.put("voteId", vote.getId());
            dataVote.put("voteText", vote.getText());
            dataVote.put("voteCount", vote.getUsers().size());
            return dataVote;
        }).toList();
    }
}
