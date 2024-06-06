package com.capstone.MovieService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.CONFLICT,reason = "Movie Already exists in User's Favourite List!!")
public class MovieAlreadyExistsException extends Exception{
}
