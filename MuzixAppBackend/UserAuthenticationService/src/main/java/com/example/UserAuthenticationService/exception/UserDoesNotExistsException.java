package com.example.UserAuthenticationService.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "User does not exists!!!")
public class UserDoesNotExistsException extends Exception{
}
