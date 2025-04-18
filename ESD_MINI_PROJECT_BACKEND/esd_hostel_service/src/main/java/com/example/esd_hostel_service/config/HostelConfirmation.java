package com.example.esd_hostel_service.config;

import com.example.esd_hostel_service.model.Student;

public record HostelConfirmation(
        int id,
        String name,
        int floor,
        int roomNumber,
        Student student
) {
}
