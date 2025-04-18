package org.example.esdemailservice.notification;


public record HostelConfirmation(
        int id,
        String name,
        int floor,
        int roomNumber,
        Student student
) {
}
