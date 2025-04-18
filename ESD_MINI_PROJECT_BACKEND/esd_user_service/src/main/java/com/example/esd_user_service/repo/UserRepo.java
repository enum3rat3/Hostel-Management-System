package com.example.esd_user_service.repo;


import com.example.esd_user_service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    public User findByEmail(String email);

}
