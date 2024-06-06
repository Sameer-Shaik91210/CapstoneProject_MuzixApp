package com.capstone.MovieService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.CONFLICT,reason = "Movie Not Found!!")
public class MovieNotFoundEXception extends Exception{
}
