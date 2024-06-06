package com.capstone.MovieService.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class User {

    @Id
    private String userId;
    private String userName;
    private String password;
    private String userEmail;
    private String imageUrl;

    private List<FavouriteMovie> movieList;

    public User() {
    }

    public User(String userId, String userName, String password, String userEmail, String imageUrl, List<FavouriteMovie> movieList) {
        this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.userEmail = userEmail;
        this.imageUrl = imageUrl;
        this.movieList = movieList;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<FavouriteMovie> getMovieList() {
        return movieList;
    }

    public void setMovieList(List<FavouriteMovie> movieList) {
        this.movieList = movieList;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId='" + userId + '\'' +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", movieList=" + movieList +
                '}';
    }
}
