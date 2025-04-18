package com.example.esd_user_service.controller;




import com.example.esd_user_service.model.User;
import com.example.esd_user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> findUserById(
            @PathVariable Long userId,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserById(userId);
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> findAllUsers(

            @RequestHeader("Authorization") String jwt)  {
        List<User> users = userService.findAllUsers();



        return new ResponseEntity<>(users, HttpStatus.ACCEPTED);
    }



}
