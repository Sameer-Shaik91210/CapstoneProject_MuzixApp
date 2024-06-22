package com.example.UserAuthenticationService.domain;
import javax.persistence.Entity;
import javax.persistence.Id;
@Entity
public class User {
    @Id
    private String userEmail;
    private String password;



    private String imageUrl;

    @Override
    public String toString() {
        return "User{" +
                "userEmail='" + userEmail + '\'' +
                ", password='" + password + '\'' +
                ", userProfile='" + imageUrl + '\'' +
                '}';
    }

    public User(String userEmail, String password, String imageUrl) {
        this.userEmail = userEmail;
        this.password = password;
        this.imageUrl = imageUrl;
    }



    public User() {
    }


    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }



    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
