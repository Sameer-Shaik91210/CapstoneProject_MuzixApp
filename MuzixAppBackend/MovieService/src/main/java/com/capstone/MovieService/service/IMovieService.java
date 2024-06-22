package com.capstone.MovieService.service;

import com.capstone.MovieService.domain.FavouriteMovie;
import com.capstone.MovieService.domain.User;
import com.capstone.MovieService.exception.MovieAlreadyExistsException;
import com.capstone.MovieService.exception.MovieNotFoundEXception;
import com.capstone.MovieService.exception.UserAlreadyExistsException;
import com.capstone.MovieService.exception.UserNotFoundException;

import java.util.List;

public interface IMovieService {

    User registerUser(User user) throws UserAlreadyExistsException;
    User saveUserFavouriteMovieToTheMovieList(FavouriteMovie movie, String userEmail) throws MovieAlreadyExistsException, UserNotFoundException;

    User deleteAMovieFromUserFavouriteMovieList(int id,String userEmail) throws
            UserNotFoundException, MovieNotFoundEXception;

    List<FavouriteMovie> getAllFavouriteMoviesOfUser(String userEmail) throws UserNotFoundException,Exception;
}
