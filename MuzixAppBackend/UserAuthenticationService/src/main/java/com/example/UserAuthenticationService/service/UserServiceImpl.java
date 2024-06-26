package com.example.UserAuthenticationService.service;
import com.example.UserAuthenticationService.domain.User;
import com.example.UserAuthenticationService.exception.InvalidCredentialsException;
import com.example.UserAuthenticationService.exception.UserAlreadyExistsException;
import com.example.UserAuthenticationService.exception.UserDoesNotExistsException;
import com.example.UserAuthenticationService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class UserServiceImpl implements UserService{
    private UserRepository userRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public User saveUser(User user) throws UserAlreadyExistsException {
        if (userRepository.findByUserEmail(user.getUserEmail()).isPresent()) {
            throw new UserAlreadyExistsException();
        }
        return userRepository.save(user);
    }

    @Override
    public String getUserProfileImage(String userEmail) throws UserDoesNotExistsException{
        if (userRepository.findByUserEmail(userEmail).isEmpty()) {
            throw new UserDoesNotExistsException();
        }

        User user=userRepository.findByUserEmail(userEmail).get();


        return user.getImageUrl();
    }


    @Override
    public User getUserByUserEmailAndPassword(String userEmail, String password) throws InvalidCredentialsException {
        User loggedInUser = userRepository.findByUserEmailAndPassword(userEmail, password);
        if (loggedInUser == null) {
            throw new InvalidCredentialsException();
        }
        return loggedInUser;
    }
}
