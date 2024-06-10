package com.example.UserAuthenticationService.controller;

import com.example.UserAuthenticationService.domain.User;
import com.example.UserAuthenticationService.exception.InvalidCredentialsException;
import com.example.UserAuthenticationService.exception.UserAlreadyExistsException;
import com.example.UserAuthenticationService.security.SecurityTokenGenerator;
import com.example.UserAuthenticationService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    private UserService userService;
    private SecurityTokenGenerator securityTokenGenerator;
    private ResponseEntity responseEntity;

    @Autowired
    public UserController(UserService userService, SecurityTokenGenerator securityTokenGenerator) {
        this.userService = userService;
        this.securityTokenGenerator = securityTokenGenerator;
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) throws UserAlreadyExistsException {
        try {
            userService.saveUser(user);
            responseEntity = new ResponseEntity<>(user, HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {
            throw new UserAlreadyExistsException();
        } catch (Exception e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) throws InvalidCredentialsException {
        try {
            User retrievedUser = userService.getUserByUserIdAndPassword(user.getUserId(), user.getPassword());
            if (retrievedUser == null) {
                throw new InvalidCredentialsException();
            }
            String token = securityTokenGenerator.createToken(user);
            responseEntity = new ResponseEntity<>(token, HttpStatus.OK);
        }catch (InvalidCredentialsException e) {
            throw new InvalidCredentialsException();
        }
        catch (Exception e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }
}
