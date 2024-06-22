package com.capstone.MovieService.repository;

import com.capstone.MovieService.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepository extends MongoRepository<User,String> {
    Optional<User> findByUserEmail(String userEmail);
}
