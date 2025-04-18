package com.example.esd_hostel_service.exception;

public class StudentAllreadyAllocated extends RuntimeException {

    private String message;

    public StudentAllreadyAllocated(){

    }
    public StudentAllreadyAllocated(String message) {

        super(message);
        this.message = message;
    }
}
