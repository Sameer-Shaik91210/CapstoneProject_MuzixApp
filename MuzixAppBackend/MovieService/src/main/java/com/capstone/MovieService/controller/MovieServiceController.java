package com.capstone.MovieService.controller;


import com.capstone.MovieService.domain.FavouriteMovie;
import com.capstone.MovieService.domain.User;
import com.capstone.MovieService.exception.MovieAlreadyExistsException;
import com.capstone.MovieService.exception.MovieNotFoundEXception;
import com.capstone.MovieService.exception.UserAlreadyExistsException;
import com.capstone.MovieService.exception.UserNotFoundException;
import com.capstone.MovieService.service.IMovieService;
import io.jsonwebtoken.Claims;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v2/")
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
        try {
            responseEntity = new ResponseEntity<User>(movieService.registerUser(user), HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception e) {
            responseEntity = new ResponseEntity<String>("An error occurred while registering the user.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    //save favourite movie

    @PostMapping("user/movie")
    public ResponseEntity<?> saveFavouriteMovie(@RequestBody FavouriteMovie movie, HttpServletRequest request) throws UserNotFoundException, MovieAlreadyExistsException {

        try {
            Claims claims = (Claims) request.getAttribute("claims");
            String userEmail = claims.getSubject();
            System.out.println("Inside save movie api , userEmail from token is :"+userEmail+ "  and movie is "+movie);
            //responseEntity = new ResponseEntity<User>(movieService.saveUserFavouriteMovieToTheMovieList(movie, userEmail), HttpStatus.OK);
            User updatedUser = movieService.saveUserFavouriteMovieToTheMovieList(movie, userEmail);
            System.out.println("Successfully saved movie to user favorites list!!");
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (UserNotFoundException | MovieAlreadyExistsException e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception e) {
            responseEntity = new ResponseEntity<String>("An error occurred while saving the favourite movie.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    //delete a movie from user's favourite movie list

    @DeleteMapping("user/movie/{id}")
    public ResponseEntity<?> deleteAMovieFromUserFavouriteMovieList(@PathVariable int id,HttpServletRequest request) throws UserNotFoundException, MovieNotFoundEXception {
        try {
            Claims claims = (Claims) request.getAttribute("claims");
            String userEmail = claims.getSubject();
            responseEntity = new ResponseEntity<User>(movieService.deleteAMovieFromUserFavouriteMovieList(id, userEmail), HttpStatus.OK);
        } catch (UserNotFoundException | MovieNotFoundEXception e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            responseEntity = new ResponseEntity<String>("An error occurred while deleting the movie.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    //retrieve all favourite movies
    @Operation(summary = "fetching a Movies", description = "This will add a new Movies to app")
    @ApiResponse(responseCode = "200", description = "Movies added successfully")
    @GetMapping("user/movies")
    public ResponseEntity<?> getAllFavouriteMovies(HttpServletRequest request) throws Exception {
        try {
            Claims claims = (Claims) request.getAttribute("claims");
            String userEmail = claims.getSubject();
            responseEntity = new ResponseEntity<List<FavouriteMovie>>(movieService.getAllFavouriteMoviesOfUser(userEmail), HttpStatus.OK);
        } catch (Exception e) {
            responseEntity = new ResponseEntity<String>("An error occurred while retrieving the favourite movies.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }
}
