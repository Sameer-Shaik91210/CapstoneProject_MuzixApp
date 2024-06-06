package com.capstone.MovieService.repository;

import com.capstone.MovieService.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends MongoRepository<User,String> {
}
