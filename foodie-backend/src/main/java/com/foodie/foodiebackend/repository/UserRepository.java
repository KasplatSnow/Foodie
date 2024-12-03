package com.foodie.foodiebackend.repository;
import com.foodie.foodiebackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{
}
