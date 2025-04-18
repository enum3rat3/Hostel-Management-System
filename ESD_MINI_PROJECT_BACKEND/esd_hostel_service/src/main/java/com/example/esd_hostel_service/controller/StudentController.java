package com.example.esd_hostel_service.controller;

import com.example.esd_hostel_service.model.Student;
import com.example.esd_hostel_service.model.UserDto;
import com.example.esd_hostel_service.service.StudentService;
import com.example.esd_hostel_service.service.UserService;
import jakarta.persistence.GeneratedValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("api/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private UserService userService;

    @PostMapping("add")
    public ResponseEntity<String> add_student(@RequestBody List<Student> students,@RequestHeader("Authorization") String jwt) throws Exception {

        if(jwt==null){
            throw new Exception("jwt required...");
        }
        UserDto user=userService.getUserProfileHandler(jwt);

        if(user==null || !user.getRole().equals("ROLE_WARDEN")){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        try{
            System.out.println(students);
            studentService.add_student(students);
        }catch (Exception e){
            e.printStackTrace();
        }

        return ResponseEntity.ok("Student added successfully");

    }

    @GetMapping("studentList")
    public ResponseEntity<List<Student>> get_all_students(@RequestHeader("Authorization") String jwt) throws Exception {

        if(jwt==null){
            throw new Exception("jwt required...");
        }
        UserDto user=userService.getUserProfileHandler(jwt);

        if(user==null || !user.getRole().equals("ROLE_WARDEN")){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<Student> students = null;
        try {
            students = studentService.get_all_students();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return  students.size()>0?ResponseEntity.ok(students):ResponseEntity.noContent().build();

    }
}
