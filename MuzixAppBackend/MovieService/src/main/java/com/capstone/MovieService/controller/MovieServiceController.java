package com.capstone.MovieService.controller;


import com.capstone.MovieService.domain.FavouriteMovie;
import com.capstone.MovieService.domain.User;
import com.capstone.MovieService.exception.MovieAlreadyExistsException;
import com.capstone.MovieService.exception.MovieNotFoundEXception;
import com.capstone.MovieService.exception.UserAlreadyExistsException;
import com.capstone.MovieService.exception.UserNotFoundException;
import com.capstone.MovieService.service.IMovieService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("api/v2")
public class MovieServiceController {

    private IMovieService movieService;
    private ResponseEntity responseEntity;

    @Autowired
    public MovieServiceController(IMovieService movieService) {
        this.movieService = movieService;

    }

    //register
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) throws UserAlreadyExistsException {
        try {
         responseEntity = new ResponseEntity<User>(movieService.registerUser(user), HttpStatus.CREATED);
    }
        catch(UserAlreadyExistsException e)
        {
            throw new UserAlreadyExistsException();
        }
        return responseEntity;
    }

    //save favourite movie

    @PostMapping("/user/movie")
    public ResponseEntity<?> saveFavouriteMovie(@RequestBody FavouriteMovie movie, HttpServletRequest request)
            throws UserNotFoundException, MovieAlreadyExistsException {
        try {
            Claims claims = (Claims) request.getAttribute("claims");
            String userId = claims.getSubject();
            responseEntity = new ResponseEntity<User>(movieService.saveUserFavouriteMovieToTheMovieList(movie, userId), HttpStatus.OK);
        }
        catch (UserNotFoundException | MovieAlreadyExistsException e) {
            throw new MovieAlreadyExistsException();
        } catch (Exception e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    //delete a movie from user's favourite movie list

    @DeleteMapping("user/movie/{movieId}")
    public ResponseEntity<?> deleteAMovieFromUserFavouriteMovieList(@PathVariable String movieId,HttpServletRequest request) throws UserNotFoundException, MovieNotFoundEXception {
     try {
         Claims claims = (Claims) request.getAttribute("claims");
         String userId = claims.getSubject();
         responseEntity = new ResponseEntity<User>(movieService.deleteAMovieFromUserFavouriteMovieList(movieId, userId), HttpStatus.OK);
     }
     catch (UserNotFoundException | MovieNotFoundEXception e) {
         throw new MovieNotFoundEXception();
     } catch (Exception e) {
         responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
     }
     return responseEntity;
    }

    //retrieve all favourite movies

    @GetMapping("user/movies")
    public ResponseEntity<?> getAllFavouriteMovies(HttpServletRequest request) throws Exception {
        try {
            Claims claims = (Claims) request.getAttribute("claims");
            String userId = claims.getSubject();
            return new ResponseEntity<List<FavouriteMovie>>(movieService.getAllFavouriteMoviesOfUser(userId), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<String>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
