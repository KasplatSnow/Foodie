package foodie.backend.repository;

import java.util.List;

import foodie.backend.repository.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  //checks if email of user already exists for user registration
  @Query("SELECT u FROM User u WHERE u.email = :email")
  List<User> findEmails(@Param("email") String email);

  @Query("SELECT u FROM User u WHERE u.userID = :userID")
  List<User> findByID(@Param("userID") Long id);

  @Override
  @Query("SELECT u FROM User u")
  List<User> findAll();
  
  // Find a user by email
  User findByEmail(String email);
  
  List<User> findByUsername(String username);
  
  // Check if a email already exists
  boolean existsByEmail(String email);
}
