package com.example.esd_hostel_service.exception;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {

    private String message;
    private int statusCode;

    public ErrorResponse(String message) {
        super();
        this.message = message;
    }

}
