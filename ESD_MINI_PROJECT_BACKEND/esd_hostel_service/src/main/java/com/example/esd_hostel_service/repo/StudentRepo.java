package com.example.esd_hostel_service.repo;


import com.example.esd_hostel_service.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo  extends JpaRepository<Student, String> {
}
