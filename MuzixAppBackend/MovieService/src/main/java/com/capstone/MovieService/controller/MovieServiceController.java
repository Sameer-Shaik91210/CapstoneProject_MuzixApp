package com.capstone.MovieService.controller;


import com.capstone.MovieService.domain.FavouriteMovie;
import com.capstone.MovieService.domain.User;
import com.capstone.MovieService.exception.MovieAlreadyExistsException;
import com.capstone.MovieService.exception.MovieNotFoundEXception;
import com.capstone.MovieService.exception.UserAlreadyExistsException;
import com.capstone.MovieService.exception.UserNotFoundException;
import com.capstone.MovieService.service.IMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("api/v1")
public class MovieServiceController {

    private IMovieService movieService;
    private ResponseEntity responseEntity;

    @Autowired
    public MovieServiceController(IMovieService movieService) {
        this.movieService = movieService;

    }

    //register
    @PostMapping("register")
    public ResponseEntity<?> registerUser(@RequestBody User user) throws UserAlreadyExistsException {
        responseEntity=new ResponseEntity<User>(movieService.registerUser(user), HttpStatus.CREATED);
        return responseEntity;
    }

    //save favourite movie

    @PostMapping("user/{userId}/movie")
    public ResponseEntity<?> saveFavouriteMovie(@RequestBody FavouriteMovie movie, @PathVariable  String userId) throws UserNotFoundException, MovieAlreadyExistsException {
  responseEntity=new ResponseEntity<User>(movieService.saveUserFavouriteMovieToTheMovieList(movie,userId),HttpStatus.OK);
        return responseEntity;
    }

    //delete a movie from user's favourite movie list

    @DeleteMapping("user/{userId}/movie/{movieId}")
    public ResponseEntity<?> deleteAMovieFromUserFavouriteMovieList(@PathVariable String movieId,@PathVariable String userId) throws UserNotFoundException, MovieNotFoundEXception {

        responseEntity=new ResponseEntity<User>(movieService.deleteAMovieFromUserFavouriteMovieList(movieId,userId),HttpStatus.OK);
        return responseEntity;
    }

    //retrieve all favourite movies

    @GetMapping("user/movies/{userId}")
    public ResponseEntity<?> getAllFavouriteMovies(@PathVariable String userId) throws Exception {
       responseEntity=new ResponseEntity<List<FavouriteMovie>>(movieService.getAllFavouriteMoviesOfUser(userId),HttpStatus.OK);
        return responseEntity;
    }
}
