package com.example.esd_hostel_service.service;

import com.example.esd_hostel_service.model.Student;
import com.example.esd_hostel_service.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    public void add_student(List<Student> students) throws Exception {
        try{
            System.out.println(students);
            studentRepo.saveAll(students);
        }catch (Exception e){
            throw new Exception("error while saving data");
        }


    }

    public List<Student> get_all_students() throws  Exception{
        try{
            return studentRepo.findAll();
        }catch (Exception e){
            throw new Exception("error while getting data");
        }

    }

    public Student FindStudentByID(String id) throws  Exception{
        try{
            return studentRepo.findById(id).orElse(null);
        }catch (Exception e){
            throw new Exception("error while getting data");
        }
    }
}
