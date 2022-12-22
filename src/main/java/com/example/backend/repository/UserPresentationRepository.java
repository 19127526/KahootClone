package com.example.backend.repository;

import com.example.backend.common.model.RolePresentation;
import com.example.backend.model.entity.UserPresentationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserPresentationRepository extends JpaRepository<UserPresentationEntity, Long>, UserPresentationRepositoryCustom {
    Optional<UserPresentationEntity> findUserPresentationEntityByUsers_EmailAndPresentation_Id(String email, long id);
    Optional<UserPresentationEntity> findUserPresentationEntityByUsers_EmailAndPresentation_IdAndRole(String email, long id, RolePresentation role);

}
