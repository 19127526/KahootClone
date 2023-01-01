package com.example.backend.model.dto;

import lombok.Data;

import java.util.List;

@Data
//@Builder
public class VoteDto {
    private long id;
    private String text;

    private long slide;
    private List<UserVoteDto> users;
    private long voteCount;
    @Override
    public String toString() {
        return "VoteDto{" +
                "id=" + id +
                ", text='" + text + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof VoteDto voteDto)) return false;

        return id == voteDto.id;
    }

    @Override
    public int hashCode() {
        return (int) (id ^ (id >>> 32));
    }
}
