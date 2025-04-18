package com.example.esd_hostel_service.repo;

import com.example.esd_hostel_service.model.Hostel;
import com.example.esd_hostel_service.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface HostelRepo extends JpaRepository<Hostel, Integer> {



    Hostel findBystudent(Student student);

    @Query(value = "select distinct h.name from hostel as h",nativeQuery = true)
    List<String> findDistinctByHostelName();
}
