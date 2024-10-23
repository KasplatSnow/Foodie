package foodie.backend.repository;

import foodie.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  // Find a user by id
  User findByUserID(Long userID);
  // Find a user by email
  User findByEmail(String email);
  // Find a user by email
  User findByUserName(String userName);
  // Check if a email already exists
  boolean existsByEmail(String email);
}
