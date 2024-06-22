package com.capstone.MovieService.domain;

import org.springframework.data.annotation.Id;

public class FavouriteMovie {

    @Id
    private int id;
    private String title;
    private String release_date;
    private String poster_path;

    @Override
    public String toString() {
        return "FavouriteMovie{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", release_date='" + release_date + '\'' +
                ", poster_path='" + poster_path + '\'' +
                '}';
    }

    public FavouriteMovie(int id, String title, String release_date, String poster_path) {
        this.id = id;
        this.title = title;
        this.release_date = release_date;
        this.poster_path = poster_path;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getRelease_date() {
        return release_date;
    }

    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

    public String getPoster_path() {
        return poster_path;
    }

    public void setPoster_path(String poster_path) {
        this.poster_path = poster_path;
    }

    public FavouriteMovie() {
    }
}