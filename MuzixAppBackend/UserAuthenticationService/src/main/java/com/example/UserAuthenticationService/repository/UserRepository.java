package com.example.UserAuthenticationService.repository;

import com.example.UserAuthenticationService.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByUserEmailAndPassword(String userEmail, String password);

    Optional<User> findByUserEmail(String userEmail);
}
