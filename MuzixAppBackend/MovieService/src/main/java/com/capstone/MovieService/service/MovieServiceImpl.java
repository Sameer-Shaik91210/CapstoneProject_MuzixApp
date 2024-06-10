package com.capstone.MovieService.service;

import com.capstone.MovieService.domain.FavouriteMovie;
import com.capstone.MovieService.domain.User;
import com.capstone.MovieService.exception.MovieAlreadyExistsException;
import com.capstone.MovieService.exception.MovieNotFoundEXception;
import com.capstone.MovieService.exception.UserAlreadyExistsException;
import com.capstone.MovieService.exception.UserNotFoundException;
import com.capstone.MovieService.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieServiceImpl implements IMovieService {

    private MovieRepository movieRepository;

    @Autowired
    public MovieServiceImpl(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Override
    public User registerUser(User user) throws UserAlreadyExistsException {
        if(movieRepository.findById(user.getUserId()).isPresent()){
            throw new UserAlreadyExistsException();
        }
        return movieRepository.save(user);
    }

    @Override
    public User saveUserFavouriteMovieToTheMovieList(FavouriteMovie movie, String userId) throws MovieAlreadyExistsException, UserNotFoundException {
        if(movieRepository.findById(userId).isEmpty()){
            throw new UserNotFoundException();
        }
        User user=movieRepository.findById(userId).get();
        List<FavouriteMovie> userMovieList=user.getMovieList();

        //let's check whether the movie we are going to save is already existing !!

        for(FavouriteMovie currentMovie:userMovieList){
            if(currentMovie.getMovieId().equals(movie.getMovieId())){
                throw new MovieAlreadyExistsException();
            }
        }

        userMovieList.add(movie);
        user.setMovieList(userMovieList);
        return movieRepository.save(user);
    }

    @Override
    public User deleteAMovieFromUserFavouriteMovieList(String movieId, String userId) throws UserNotFoundException, MovieNotFoundEXception {

        boolean isMovieFound=false;
        if(movieRepository.findById(userId).isEmpty()){
            throw new UserNotFoundException();
        }
        User user=movieRepository.findById(userId).get();
        List<FavouriteMovie> userMovieList=user.getMovieList();

        //let's check whether the movie we are going to save is already existing !!

        for(FavouriteMovie currentMovie:userMovieList){
            if(currentMovie.getMovieId().equals(movieId)){
                isMovieFound=true;
                userMovieList.remove(currentMovie);
                break;
            }
        }

        if(!isMovieFound){
            throw new MovieNotFoundEXception();
        }


        user.setMovieList(userMovieList);
        return movieRepository.save(user);
    }

    @Override
    public List<FavouriteMovie> getAllFavouriteMoviesOfUser(String userId) throws UserNotFoundException ,Exception{

        if(movieRepository.findById(userId).isEmpty()){
            throw new UserNotFoundException();
        }
        return movieRepository.findById(userId).get().getMovieList();
    }
}
