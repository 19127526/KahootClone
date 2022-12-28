package com.example.backend.service.impl;

import com.example.backend.common.model.ActionPayload;
import com.example.backend.common.model.PresentationStatus;
import com.example.backend.common.model.Role;
import com.example.backend.common.utils.Constant;
import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.mapper.ChatMapper;
import com.example.backend.mapper.SlideMapper;
import com.example.backend.mapper.VoteMapper;
import com.example.backend.model.dto.PresentDto;
import com.example.backend.model.dto.VoteDto;
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
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class RealTimeServiceImpl implements RealTimeService {

    private final SlideRepository slideRepository;
    private final VoteRepository voteRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final PresentationRepository presentationRepository;
    private final PresentHistoryRepository presentHistoryRepository;
    private final SlideMapper slideMapper;
    private final VoteMapper voteMapper;
    private final GroupRepository groupRepository;
    private final ChatMapper chatMapper;
    private final ChatRepository chatRepository;
    private final UserVoteRepository userVoteRepository;

    @Override
    public void choseVote(InteractPresentRequest interact) {
        PresentHistoryEntity present = presentHistoryRepository.findPresentHistoryEntityByIdAndPresented(interact.getPresentId(), true).orElseThrow(() -> {
            throw new ResourceInvalidException("change invalid");
        });
        if (interact.getVotes().isEmpty()) throw new ResourceInvalidException("please chose vote");
        SlideEntity slide = slideRepository.findById(present.getSlideId()).orElseThrow(() -> {
            throw new ResourceInvalidException("vote invalid");
        });
        List<VoteEntity> votes = voteRepository.findVotesExistInListId(interact.getVotes());
        if(votes.isEmpty()) throw new ResourceInvalidException("please chose least 1 vote");
        if (present.getMode() == PresentationStatus.PUBLIC) {
            userVoteRepository.saveAll(votes.stream().map(vote -> new UserVoteEntity(vote.getId(), slide.getId(), present.getId())).toList());
        } else {
            if (interact.getEmail() == null) throw new ResourceInvalidException("please login to vote");
            UserEntity user = userRepository.findUserFromGroup(interact.getEmail(), present.getGroupId()).orElseThrow(() -> {
                throw new ResourceInvalidException("this account have not joined group yet");
            });
            userVoteRepository.saveAll(votes.stream().map(vote -> new UserVoteEntity(user.getId(), vote.getId(), slide.getId(), present.getId())).toList());
        }
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(interact.getPresentId()), Constant.TOPIC_PRESENTATION, getPayloadSlide(present.getId(), slide, ActionPayload.UPDATE_SLIDE));
    }

    @Override
    public PresentDto connect(InteractPresentRequest interact) {
        PresentHistoryEntity present;
        if (interact.getGroupId() != null) {
            present = presentHistoryRepository.findPresentHistoryEntityByGroupIdAndPresented(interact.getGroupId(), true).orElseThrow(() -> {
                throw new ResourceInvalidException("connect invalid");
            });
            userRepository.getUserAndGroupWithRoles(interact.getEmail(), interact.getGroupId(), List.of(Role.OWNER, Role.Co_OWNER, Role.MEMBER)).orElseThrow(() -> {
                throw new ResourceInvalidException("permission denied");
            });
        } else {
            present = presentHistoryRepository.findById(interact.getPresentId()).orElseThrow(() -> {
                throw new ResourceInvalidException("present not found");
            });
            if (!present.isPresented()) throw new ResourceInvalidException("presentation is closed");

        }
        return getPresentDto(present.getSlideId(), present.getId(), present.getPresentationId());
    }

    @Override
    public void changeSlide(InteractPresentRequest interact) {
        PresentHistoryEntity present = presentHistoryRepository.findPresentHistoryEntityByIdAndPresented(interact.getPresentId(), true).orElseThrow(() -> {
            throw new ResourceInvalidException("change invalid");
        });
        if (present.getMode() == PresentationStatus.PUBLIC) {
            UserEntity user = userRepository.findById(present.getUserId()).orElseThrow(() -> {
                throw new ResourceInvalidException("permission denied");
            });
            if (!Objects.equals(user.getEmail(), interact.getEmail()))
                throw new ResourceInvalidException("permission denied");
        }
        if (present.getMode() == PresentationStatus.PRIVATE) {
            long groupId = present.getGroupId();
            if (groupId != interact.getGroupId()) throw new ResourceInvalidException("change slide fail");
            userRepository.getUserAndGroupWithRoles(interact.getEmail(), interact.getGroupId(), List.of(Role.OWNER, Role.Co_OWNER)).orElseThrow(() -> {
                throw new ResourceInvalidException("permission denied");
            });
        }
        List<SlideEntity> slides = slideRepository.findByPresentation_Id(present.getPresentationId()).stream().sorted(Comparator.comparing(SlideEntity::getId)).toList();
        int i = 0;
        while (slides.get(i).getId() != present.getSlideId()) {
            ++i;
        }
        if (interact.getAction() == ActionPayload.PREVIOUS_SLIDE) {
            if (i == 0) throw new ResourceInvalidException("back slide fail");
            present.setSlideId(slides.get(--i).getId());
        } else if (interact.getAction() == ActionPayload.NEXT_SLIDE) {
            if (i >= slides.size() - 1) throw new ResourceInvalidException("next slide fail");
            present.setSlideId(slides.get(++i).getId());
        }
        presentHistoryRepository.save(present);
        HashMap<String, Object> payload = getPayloadSlide(present.getId(), slides.get(i), ActionPayload.CHANGE_SLIDE);
        payload.put("present_id", interact.getPresentId());
        payload.put("user_change_slide", interact.getEmail());
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(present.getId()), Constant.TOPIC_PRESENTATION, payload);
    }

    @Override
    public PresentDto startPresent(InteractPresentRequest interact) {
        if (interact.getEmail() == null || interact.getMode() == null || (interact.getMode() == PresentationStatus.PRIVATE && interact.getGroupId() == null))
            throw new ResourceInvalidException("cant start presentation");
        PresentationEntity presentation = presentationRepository.findById(interact.getPresentationId()).orElseThrow(() -> {
            throw new ResourceNotFoundException("presentation not found");
        });
        UserEntity user = userRepository.findAccountEntityByEmail(interact.getEmail()).orElseThrow(() -> {
            throw new ResourceInvalidException("please login");
        });
        List<SlideEntity> slides = slideRepository.findByPresentation_Id(presentation.getId()).stream().sorted(Comparator.comparing(SlideEntity::getId)).toList();
        if (slides.isEmpty()) throw new ResourceInvalidException("please created slide to present");
        long slideIdFirst = slides.get(0).getId();
        PresentHistoryEntity presentHistory;
        if (interact.getMode() == PresentationStatus.PUBLIC) {
            presentHistory = new PresentHistoryEntity(user.getId(), presentation.getId(), null, slideIdFirst);
            presentHistory = presentHistoryRepository.save(presentHistory);
        } else {
            Tuple userGroup = userRepository.getUserAndGroupWithRoles(interact.getEmail(), interact.getGroupId(), List.of(Role.OWNER, Role.Co_OWNER)).orElseThrow(() -> {
                throw new ResourceInvalidException("permission denied");
            });
            GroupEntity group = (GroupEntity) userGroup.toArray()[1];
            if (group.getPresent() != -1) throw new ResourceInvalidException("Group is presented");
            presentHistory = new PresentHistoryEntity(user.getId(), presentation.getId(), group.getId(), slideIdFirst);
            presentHistory = presentHistoryRepository.save(presentHistory);
            group.setPresent(presentHistory.getId());
            groupRepository.save(group);
            List<Long> users = userRepository.getListUserWithGroup(group.getId()).stream().filter(id -> id != user.getId()).toList();
            HashMap<String, Object> payload = new HashMap<>();
            payload.put("action", ActionPayload.START_PRESENTATION);
            payload.put("presentation", presentation.getId());
            payload.put("author", user.getEmail());
            payload.put("group", interact.getGroupId());
            System.out.println("------------------: " + users);
            users.forEach(id -> {
                System.out.println("------------------: " + id);
                simpMessagingTemplate.convertAndSendToUser(String.valueOf(id), Constant.TOPIC_LOGIN, payload);
            });
        }
        return getPresentDto(slideIdFirst, presentHistory.getId(), presentation.getId());
    }

    @Override
    public void stopPresent(InteractPresentRequest interact) {
        if (interact.getGroupId() == null) {
            UserEntity user = userRepository.findAccountEntityByEmail(interact.getEmail()).orElseThrow(() -> {
                throw new ResourceInvalidException("permission denied");
            });
            PresentHistoryEntity present = presentHistoryRepository.findPresentHistoryEntityByIdAndUserId(interact.getPresentId(), user.getId()).orElseThrow(() -> {
                throw new ResourceInvalidException("stop invalid");
            });
            present.setPresented(false);
            presentHistoryRepository.save(present);
        } else {
            Tuple userGroup = userRepository.getUserAndGroupWithRoles(interact.getEmail(), interact.getGroupId(), List.of(Role.OWNER, Role.Co_OWNER)).orElseThrow(() -> {
                throw new ResourceInvalidException("Permission denied");
            });
            GroupEntity group = (GroupEntity) userGroup.toArray()[1];
            if (group.getPresent() != interact.getPresentId())
                throw new ResourceInvalidException("presentation and group dont match");
            PresentHistoryEntity present = presentHistoryRepository.findById(interact.getPresentId()).orElseThrow(() -> {
                throw new ResourceInvalidException("stop invalid");
            });
            present.setPresented(false);
            group.setPresent(-1);
            groupRepository.save(group);
            presentHistoryRepository.save(present);
        }
        HashMap<String, Object> payload = new HashMap<>();
        payload.put("action", ActionPayload.STOP_PRESENTATION);
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(interact.getPresentId()), Constant.TOPIC_PRESENTATION, payload);
    }

    @Override
    public void sendMessage(ChatRequest chatRequest) {
        PresentHistoryEntity present = presentHistoryRepository
                .findPresentHistoryEntityByIdAndPresented(chatRequest.getPresentId(), true)
                .orElseThrow(() -> {
            throw new ResourceInvalidException("chat invalid");
        });
        ChatEntity chat = chatMapper.payloadToEntity(chatRequest);
        chat = chatRepository.save(chat);
        presentHistoryRepository.save(present);
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(present.getId()), Constant.TOPIC_PRESENTATION, getPayloadChat(chat));
    }

    @Override
    public List<ChatEntity> getChat(long presentId, long size, long offset) {
        return chatRepository.getListChatWithSize(presentId,size,offset);
    }

    private PresentDto getPresentDto(long slideId, long presentId, long presentationId) {
        SlideEntity slide = slideRepository.findById(slideId).orElseThrow(() -> {
            throw new ResourceInvalidException("slide not found");
        });
        List<VoteDto> votes = voteRepository.findVoteEntitiesBySlide_Id(slide.getId()).stream().map(vote -> {
            VoteDto dto = voteMapper.entityToDto(vote);
            dto.setVoteCount(userVoteRepository.findUserVoteEntitiesByVoteIdAndPresentId(vote.getId(), presentId).size());
            return dto;
        }).toList();
        PresentDto presentDto = slideMapper.toPresent(slide);
        presentDto.setVotes(votes);
        presentDto.setId(presentId);
        presentDto.setPresentationId(presentationId);
        return presentDto;
    }

    private HashMap<String, Object> getPayloadSlide(long presentId, SlideEntity slide, ActionPayload action) {
        HashMap<String, Object> payload = new HashMap<>();
        payload.put("action", action);
        payload.put("id_of_slide", slide.getId());
        payload.put("text_of_slide", slide.getText());
        payload.put("type_of_slide", slide.getGenreQuestion());
        payload.put("image_of_slide", slide.getImageURL());
        payload.put("votes_of_slide", getVotes(voteRepository.findVoteEntitiesBySlide_Id(slide.getId()), presentId));
        return payload;
    }

    private HashMap<String, Object> getPayloadChat(ChatEntity chatEntity) {
        HashMap<String, Object> payload = new HashMap<>();
        payload.put("action", ActionPayload.CHAT);
        payload.put("sender", chatEntity.getSender());
        payload.put("mess", chatEntity.getMess());
        payload.put("presentation", chatEntity.getPresentId());
        return payload;
    }

    private List<Map<String, Object>> getVotes(List<VoteEntity> votes, long presentId) {
        return votes.stream().map(vote -> {
            Map<String, Object> dataVote = new HashMap<>();
            dataVote.put("voteId", vote.getId());
            dataVote.put("voteText", vote.getText());
            dataVote.put("voteCount", userVoteRepository.findUserVoteEntitiesByVoteIdAndPresentId(vote.getId(), presentId).size());
            return dataVote;
        }).toList();
    }
}
