package com.example.esd_user_service.exception;

public class JwtTokenNotValid extends RuntimeException {

    private String message;

    public JwtTokenNotValid(){

    }
    public JwtTokenNotValid(String message) {

        super(message);
        this.message = message;
    }
}
