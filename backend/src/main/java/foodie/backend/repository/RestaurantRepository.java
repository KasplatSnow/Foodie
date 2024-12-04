package foodie.backend.repository;

import foodie.backend.model.BusinessOwner;
import foodie.backend.model.Restaurant;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
  
  List<Restaurant> findByRating(Float rating);

  List<Restaurant> findByPrice(Integer price);
  
  @Query("SELECT r FROM Restaurant r WHERE r.zip_code = :zip_code")
  List<Restaurant> findByZipCode(@Param("zip_code") String zip_code);

  List<Restaurant> findByAddressContainingIgnoreCase(String address);

  List<Restaurant> findByNameContainingIgnoreCaseOrCuisineContainingIgnoreCase(String name, String cuisine);

  @Query("SELECT r FROM Restaurant r WHERE r.restaurantID = :restaurantID")
  Restaurant findByRestaurantID(@Param("restaurantID") Long restaurantID);

  // Check if a restaurant exists by ID
  boolean existsById(Long id);

  List<Restaurant> findByBusinessOwner(BusinessOwner businessOwner);

  //implement
  List<Restaurant> checkForDuplicateListings();

  void removeClosedRestaurant(Long restaurantId);
}
