package com.example.esd_user_service.service;


import com.example.esd_user_service.model.User;

import java.util.List;

public interface UserService {

    public User findUserProfileByJwt(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;

    public User findUserById(Long userId) throws Exception;

    public List<User> findAllUsers();
}
