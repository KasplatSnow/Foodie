package foodie.backend.repository;

import java.util.List;

import foodie.backend.repository.BusinessOwner;
import foodie.backend.repository.Restaurant;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface BusinessOwnerRepository extends JpaRepository<BusinessOwner, Long> {
  BusinessOwner findByEmail(String email);
  boolean existsByEmail(String email);
    
  @Query("SELECT r FROM Restaurant r WHERE r.owner.userID = :userID")
  List<Restaurant> findRestaurantByOwnerID(@Param("userID") Long userID);

  @Query("SELECT b FROM User b WHERE b.role = BUSINESS AND b.userID = :userID")
  BusinessOwner findBusinessOwnerByID(@Param("userID") Long userID);
}
