package foodie.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
  
  List<Restaurant> findByRating(Float rating);

  List<Restaurant> findByPrice(Integer price);
  
  List<Restaurant> findByName(String name);

  List<Restaurant> findAll();

  boolean existsByAddress(String address);

  @Modifying
  @Transactional  
  @Query("DELETE FROM Restaurant WHERE restaurantID = :restaurantID ")
  void deleteById(@Param("restaurantID") Long restaurantID);

  @Query("SELECT r FROM Restaurant r WHERE r.zip_code = :zip_code")
  List<Restaurant> findByZipCode(@Param("zip_code") String zip_code);

  List<Restaurant> findByAddressContainingIgnoreCase(String address);

  @Query("SELECT r FROM Restaurant r WHERE r.restaurantID = :restaurantID")
  Restaurant findByRestaurantID(@Param("restaurantID") Long restaurantID);
  
  @Query("SELECT r FROM Restaurant r WHERE r.name = :name AND r.address = :address")
  List<Restaurant> existsByNameContainingIgnoreCaseAndAddressContainingIgnoreCase(@Param("name") String name, @Param("address") String address);

  @Modifying
  @Transactional
  @Query("UPDATE Restaurant r SET r.owner = (SELECT u FROM User u WHERE u.userID = :businessOwnerID) WHERE r.restaurantID = :restaurantID")
  void updateOwner(@Param("businessOwnerID") Long businessOwnerID, @Param("restaurantId") Long restaurantID);
}
