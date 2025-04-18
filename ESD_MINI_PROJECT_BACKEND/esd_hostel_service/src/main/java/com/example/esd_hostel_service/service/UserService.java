package com.example.esd_hostel_service.service;

import com.example.esd_hostel_service.model.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "${feignClient.service-name}", url = "http://${feignClient.service-name}:5002")
public interface UserService {

    @GetMapping("/api/users/profile")
    public UserDto getUserProfileHandler(
            @RequestHeader("Authorization") String jwt);
}