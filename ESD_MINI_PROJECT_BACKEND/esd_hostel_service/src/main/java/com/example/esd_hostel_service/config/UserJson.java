package com.example.esd_hostel_service.config;


import lombok.*;
import org.springframework.stereotype.Component;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Component
public class UserJson {

    private String name;
    private String email;
}
