package com.example.backend.repository;

import com.example.backend.common.model.RolePresentation;
import com.querydsl.core.Tuple;

import java.util.List;
import java.util.Optional;

public interface UserPresentationRepositoryCustom {
    Optional<Tuple> getUserAndPresentationWithRole(String email, long presentationId, List<RolePresentation> roles);
    List<Tuple> getListPresentationsAndOwnerWithRole(String email, List<RolePresentation> roles);
    List<Tuple> getListCollaborationsAndRole(long presentationId, List<RolePresentation> roles);
}
