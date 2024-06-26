package com.example.UserAuthenticationService.controller;

import com.example.UserAuthenticationService.domain.User;
import com.example.UserAuthenticationService.exception.InvalidCredentialsException;
import com.example.UserAuthenticationService.exception.UserAlreadyExistsException;
import com.example.UserAuthenticationService.exception.UserDoesNotExistsException;
import com.example.UserAuthenticationService.security.SecurityTokenGenerator;
import com.example.UserAuthenticationService.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/")
public class UserController {

    private UserService userService;
    private SecurityTokenGenerator securityTokenGenerator;

    @Autowired
    public UserController(UserService userService, SecurityTokenGenerator securityTokenGenerator) {
        this.userService = userService;
        this.securityTokenGenerator = securityTokenGenerator;
    }

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody User user) throws UserAlreadyExistsException {
        try {
            userService.saveUser(user);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {
            throw new UserAlreadyExistsException();
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody User user) throws InvalidCredentialsException {
        try {
            User retrievedUser = userService.getUserByUserEmailAndPassword(user.getUserEmail(), user.getPassword());
            if (retrievedUser == null) {
                throw new InvalidCredentialsException();
            }
            String token = securityTokenGenerator.createToken(retrievedUser);
            Map<String,String> map=new HashMap<>();
            map.put("token",token);
            map.put("email",user.getUserEmail());
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (InvalidCredentialsException e) {
            throw new InvalidCredentialsException();
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "fetching a Movies", description = "This will add a new Movies to app")
    @ApiResponse(responseCode = "200", description = "Movies added successfully")
    @GetMapping("userProfile/{userEmail}")
    public ResponseEntity<?> getUserProfile(@PathVariable String userEmail) throws UserDoesNotExistsException{
        return new ResponseEntity<>(userService.getUserProfileImage(userEmail),HttpStatus.OK);
    }
}
