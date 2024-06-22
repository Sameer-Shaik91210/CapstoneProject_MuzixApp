package com.example.UserAuthenticationService.service;

import com.example.UserAuthenticationService.domain.User;
import com.example.UserAuthenticationService.exception.InvalidCredentialsException;
import com.example.UserAuthenticationService.exception.UserAlreadyExistsException;
import com.example.UserAuthenticationService.exception.UserDoesNotExistsException;

public interface UserService
{
    User saveUser (User user) throws UserAlreadyExistsException;

    String getUserProfileImage(String userEmail) throws UserDoesNotExistsException;

    User getUserByUserEmailAndPassword(String userEmail, String password) throws InvalidCredentialsException;
}
