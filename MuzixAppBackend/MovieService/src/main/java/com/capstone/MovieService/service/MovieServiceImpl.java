package com.capstone.MovieService.service;

import com.capstone.MovieService.domain.FavouriteMovie;
import com.capstone.MovieService.domain.User;
import com.capstone.MovieService.exception.MovieAlreadyExistsException;
import com.capstone.MovieService.exception.MovieNotFoundEXception;
import com.capstone.MovieService.exception.UserAlreadyExistsException;
import com.capstone.MovieService.exception.UserNotFoundException;
import com.capstone.MovieService.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.capstone.MovieService.proxy.Userproxy;

import java.sql.SQLOutput;
import java.util.Arrays;
import java.util.List;

@Service
public class MovieServiceImpl implements IMovieService {

    private MovieRepository movieRepository;
    private Userproxy userproxy;
    @Autowired
    public MovieServiceImpl(MovieRepository movieRepository, Userproxy userproxy) {
        this.movieRepository = movieRepository;
        this.userproxy = userproxy;
    }

    @Override
    public User registerUser(User user) throws UserAlreadyExistsException {
        System.out.println("user"+user+"  \n userId"+ user.getUserId());
        if(movieRepository.findById(user.getUserId()).isPresent()){
            throw new UserAlreadyExistsException();
        }
        User savedUser= movieRepository.save(user);
        System.out.println("Saved User"+savedUser.getUserId());
        if(!savedUser.getUserId().isEmpty()){
            ResponseEntity r=userproxy.register(user);
            System.out.println("successfully stored in mysqlDB"+r.getBody());
        }
        return savedUser;
    }

    @Override
    public User saveUserFavouriteMovieToTheMovieList(FavouriteMovie movie, String userId) throws MovieAlreadyExistsException, UserNotFoundException {
        if(movieRepository.findById(userId).isEmpty()){
            throw new UserNotFoundException();
        }
        User user=movieRepository.findById(userId).get();
        if (user.getMovieList() == null) {
            user.setMovieList(Arrays.asList(movie));
        } else {
            List<FavouriteMovie> userMovieList = user.getMovieList();
            //let's check whether the movie we are going to save is already existing !!
            userMovieList.add(movie);
            user.setMovieList(userMovieList);
        }
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