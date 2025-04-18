package com.example.esd_user_service.service;



import com.example.esd_user_service.config.JwtProvider;
import com.example.esd_user_service.exception.JwtTokenNotValid;
import com.example.esd_user_service.model.User;
import com.example.esd_user_service.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserServiceImplementation implements  UserService {

    @Autowired
    private UserRepo userRepo;


    @Override
    public User findUserProfileByJwt(String jwt) throws Exception {
        String email= JwtProvider.getEmailFromJwtToken(jwt);


        User user = userRepo.findByEmail(email);

        if(user==null) {
            throw new JwtTokenNotValid("Invalid credentials");
        }
        return user;
    }

    @Override
    public User findUserByEmail(String username) throws Exception {

        User user=userRepo.findByEmail(username);

        if(user!=null) {

            return user;
        }

        throw new JwtTokenNotValid("Invalid credentials");
    }

    @Override
    public User findUserById(Long userId) throws Exception {
        Optional<User> opt = userRepo.findById(userId);

        if(opt.isEmpty()) {
            throw new JwtTokenNotValid("Invalid credentials");
        }
        return opt.get();
    }

    @Override
    public List<User> findAllUsers() {
        return userRepo.findAll();
    }
}
