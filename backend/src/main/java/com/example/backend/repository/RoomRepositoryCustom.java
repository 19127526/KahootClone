package com.example.backend.repository;

import com.querydsl.core.Tuple;

import java.util.List;

public interface RoomRepositoryCustom {
    List<Tuple> getGroupDetail(String name);

}
