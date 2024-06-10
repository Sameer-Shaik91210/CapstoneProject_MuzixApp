package com.capstone.MovieService.proxy;

import com.capstone.MovieService.domain.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="user-authentication-service",url="localhost:8081")
public interface Userproxy {
    @PostMapping("/api/v1/register")
    public ResponseEntity<?> register(@RequestBody User user);
}
