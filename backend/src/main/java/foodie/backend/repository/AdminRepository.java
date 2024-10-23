package foodie.backend.repository;

import foodie.backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
  Admin findByID(Long id);

  Admin findByEmail(String email);

  boolean existsByEmail(String email);
}
