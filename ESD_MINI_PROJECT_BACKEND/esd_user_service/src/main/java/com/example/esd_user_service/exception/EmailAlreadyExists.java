package com.example.esd_user_service.exception;

public class EmailAlreadyExists extends RuntimeException {

    private String message;

    public EmailAlreadyExists(){

    }
    public EmailAlreadyExists(String message) {

        super(message);
        this.message = message;
    }
}
