package com.example.esd_hostel_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class EsdHostelServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EsdHostelServiceApplication.class, args);
	}

}
