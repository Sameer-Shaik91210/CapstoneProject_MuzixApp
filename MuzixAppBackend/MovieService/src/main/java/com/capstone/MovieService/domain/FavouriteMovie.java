package com.capstone.MovieService.domain;

import org.springframework.data.annotation.Id;

public class FavouriteMovie {

    @Id
    private String movieId;
    private String movieName;
    private int yearOfRelease;
    private String trailerURL;

    public FavouriteMovie() {
    }

    public FavouriteMovie(String movieId, String movieName, int yearOfRelease, String trailerURL) {
        this.movieId = movieId;
        this.movieName = movieName;
        this.yearOfRelease = yearOfRelease;
        this.trailerURL = trailerURL;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public int getYearOfRelease() {
        return yearOfRelease;
    }

    public void setYearOfRelease(int yearOfRelease) {
        this.yearOfRelease = yearOfRelease;
    }

    public String getTrailerURL() {
        return trailerURL;
    }

    public void setTrailerURL(String trailerURL) {
        this.trailerURL = trailerURL;
    }

    @Override
    public String toString() {
        return "FavouriteMovie{" +
                "movieId='" + movieId + '\'' +
                ", movieName='" + movieName + '\'' +
                ", yearOfRelease=" + yearOfRelease +
                ", trailerURL='" + trailerURL + '\'' +
                '}';
    }
}
