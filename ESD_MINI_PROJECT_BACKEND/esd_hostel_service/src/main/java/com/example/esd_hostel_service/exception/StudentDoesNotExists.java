package com.example.esd_hostel_service.exception;

public class StudentDoesNotExists extends RuntimeException {

    private String message;

    public StudentDoesNotExists(){

    }
    public StudentDoesNotExists(String message) {

        super(message);
        this.message = message;
    }
}
