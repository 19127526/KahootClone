package com.example.backend.repository;

import com.example.backend.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long>, UserRepositoryCustom, UserGroupRepositoryCustom, UserPresentationRepositoryCustom {
    Optional<UserEntity> findAccountEntityByEmail(String email);
    Optional<UserEntity> findAccountEntityByEmailAndPassword(String email, String password);
}
