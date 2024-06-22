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

import java.util.ArrayList;
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
        if(movieRepository.findByUserEmail(user.getUserEmail()).isPresent()){
            throw new UserAlreadyExistsException();
        }
        User savedUser= movieRepository.save(user);
        System.out.println("Successfully saved user to Mongo DB ,trying to save user to Authentication related My SQL DB... "+user);
        if(!savedUser.getUserEmail().isEmpty()){
            ResponseEntity r=userproxy.register(user);
            System.out.println("successfully registed authentication database.."+r.getBody());
        }
        return savedUser;
    }

    @Override
    public User saveUserFavouriteMovieToTheMovieList(FavouriteMovie movie, String userEmail) throws MovieAlreadyExistsException, UserNotFoundException {
        if(movieRepository.findByUserEmail(userEmail).isEmpty()){
            System.out.println("User Not Found "+userEmail +" Movie "+movie);
            throw new UserNotFoundException();
        }
        User user=movieRepository.findByUserEmail(userEmail).get();
        System.out.println("The found user is :"+user);
        List<FavouriteMovie> userMovieList=user.getMovieList();
        System.out.println("usermovielist"+userMovieList);
        //let's check whether the movie we are going to save is already existing !!

        if(userMovieList==null){
            userMovieList=new ArrayList<>();
        }
        for(FavouriteMovie currentMovie:userMovieList){
            if(currentMovie.getId()==(movie.getId())){
                System.out.println("The movie is already existing "+movie.getId() +"Existing movie"+currentMovie.getId());
                throw new MovieAlreadyExistsException();
            }
        }

        System.out.println("Before Adding  movie to user movie list!");
        userMovieList.add(movie);
        System.out.println("After Adding  movie to user movie list!");

        user.setMovieList(userMovieList);
        return movieRepository.save(user);
    }



    @Override
    public User deleteAMovieFromUserFavouriteMovieList(int id, String userEmail) throws UserNotFoundException, MovieNotFoundEXception {

        boolean isMovieFound=false;
        if(movieRepository.findByUserEmail(userEmail).isEmpty()){
            throw new UserNotFoundException();
        }
        User user=movieRepository.findByUserEmail(userEmail).get();
        List<FavouriteMovie> userMovieList=user.getMovieList();

        //let's check whether the movie we are going to save is already existing !!

        for(FavouriteMovie currentMovie:userMovieList){
            if(currentMovie.getId()==(id)){
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
    public List<FavouriteMovie> getAllFavouriteMoviesOfUser(String userEmail) throws UserNotFoundException ,Exception{

        if(movieRepository.findByUserEmail(userEmail).isEmpty()){
            throw new UserNotFoundException();
        }
        return movieRepository.findByUserEmail(userEmail).get().getMovieList();
    }
}

