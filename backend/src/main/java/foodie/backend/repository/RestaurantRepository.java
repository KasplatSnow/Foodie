package foodie.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

/**
 * Repository interface for performing CRUD operations on "Restaurants".
 * Extends JpaRepository to provide built-in methods using db queries.
 * Introduces methods that find a restaurant by any detail, a full list of restaurants, deletion, and update restaurant owner 
 */

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
  
  List<Restaurant> findByRating(Float rating);

  List<Restaurant> findByPrice(Integer price);
  
  List<Restaurant> findByName(String name);
    
  Restaurant findByNameContainingIgnoreCaseAndAddressContainingIgnoreCase(String name, String Address);

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
  void updateOwner(@Param("businessOwnerID") Long businessOwnerID, @Param("restaurantID") Long restaurantID);

  @Modifying
  @Transactional
  @Query("INSERT INTO Restaurant(name, address, lng, lat) VALUES(:name, :address, :lng, :lat)")
  void saveShellRestaurant(@Param("name") String name, @Param("address") String address, @Param("lng") double lng, @Param("lat") double lat);
}
