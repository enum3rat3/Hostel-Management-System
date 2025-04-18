package com.example.esd_hostel_service.controller;


import com.example.esd_hostel_service.exception.JwtTokenNotValid;
import com.example.esd_hostel_service.model.Hostel;
import com.example.esd_hostel_service.model.UserDto;
import com.example.esd_hostel_service.service.HostelService;
import com.example.esd_hostel_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("api/hostel")
public class HostelController {


    @Autowired
    private HostelService hostelService;
    @Autowired
    private UserService userService;





    @GetMapping("allrooms")
    public ResponseEntity<?> getAllHostelsRooms(@RequestParam String name,@RequestParam int floor,@RequestParam int all,@RequestHeader("Authorization") String jwt) throws Exception{

        if(jwt==null){
            throw new JwtTokenNotValid("UNAUTHORIZED CREDENTIALS");
        }
        UserDto user=userService.getUserProfileHandler(jwt);

        if(user==null || !user.getRole().equals("ROLE_WARDEN")){
            throw new JwtTokenNotValid("UNAUTHORIZED CREDENTIALS");
        }



        return hostelService.getAllHostelsRooms(name,floor,all);

    }

    @GetMapping("room/{id}")
    public ResponseEntity<?> getHostelsRoomsById(@PathVariable int id,@RequestHeader("Authorization") String jwt) throws Exception{

        if(jwt==null){
            throw new JwtTokenNotValid("UNAUTHORIZED CREDENTIALS");
        }
        UserDto user=userService.getUserProfileHandler(jwt);

        if(user==null || !user.getRole().equals("ROLE_WARDEN")){
            throw new JwtTokenNotValid("UNAUTHORIZED CREDENTIALS");
        }


        return hostelService.getHostelsRoomsById(id);



    }

    @GetMapping("hostelname")
    public ResponseEntity<?>getHostelName(@RequestHeader("Authorization") String jwt){
            if(jwt==null){
                throw new JwtTokenNotValid("UNAUTHORIZED CREDENTIALS");
            }
            UserDto user=userService.getUserProfileHandler(jwt);

            if(user==null || !user.getRole().equals("ROLE_WARDEN")){
                throw new JwtTokenNotValid("UNAUTHORIZED CREDENTIALS");
            }

            return hostelService.getHostelName();
    }





    @PostMapping("add")
    public ResponseEntity<?> add_rooms(@RequestBody List<Hostel> hostels,@RequestHeader("Authorization") String jwt) throws Exception {
        if(jwt==null){
            throw new JwtTokenNotValid("UNAUTHORIZED CREDENTIALS");
        }
        UserDto user=userService.getUserProfileHandler(jwt);

        if(user==null || !user.getRole().equals("ROLE_WARDEN")){
            throw new JwtTokenNotValid("UNAUTHORIZED CREDENTIALS");
        }

        hostelService.add_rooms(hostels);
        return hostelService.getAllHostelsRooms("",0,0);

    }

    @PutMapping("allocate")
    public ResponseEntity<?> allocate_rooms(@RequestBody Hostel hostel,@RequestHeader("Authorization") String jwt) throws Exception {

        if(jwt==null){
            throw new JwtTokenNotValid("UNAUTHORIZED CREDENTIALS");
        }
        UserDto user=userService.getUserProfileHandler(jwt);

        if(user==null || !user.getRole().equals("ROLE_WARDEN")){
            throw new JwtTokenNotValid("UNAUTHORIZED CREDENTIALS");
        }


        return hostelService.allocate_rooms(hostel);

    }

    @PutMapping("vacant/{id}")
    public ResponseEntity<?> vacant_room(@PathVariable int id,@RequestBody Hostel hostel,@RequestHeader("Authorization") String jwt) throws Exception {
        if(jwt==null){
            throw new JwtTokenNotValid("UNAUTHORIZED CREDENTIALS");
        }
        UserDto user=userService.getUserProfileHandler(jwt);

        if(user==null || !user.getRole().equals("ROLE_WARDEN")){
            throw new JwtTokenNotValid("UNAUTHORIZED CREDENTIALS");
        }
        return hostelService.vacant_room(hostel);

    }



}
