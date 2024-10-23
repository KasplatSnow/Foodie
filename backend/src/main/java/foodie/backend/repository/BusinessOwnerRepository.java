package foodie.backend.repository;

import foodie.backend.model.BusinessOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessOwnerRepository
  extends JpaRepository<BusinessOwner, Long> {
  BusinessOwner findByEmail(String email);
  boolean existsByEmail(String email);
}
