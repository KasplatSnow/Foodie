package foodie.backend.repository;

import foodie.backend.model.BusinessOwner;
import foodie.backend.model.Restaurant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
  // Find a restaurant by id
  Restaurant findByID(Long restaurantID);

  // Find a restaurant by address
  Restaurant findByAddress(String address);

  // Find a restaurant by name
  Restaurant findByName(String name);

  // Find restaurants by type of cuisine
  List<Restaurant> findByCuisineType(String cuisineType);

  // Check if a restaurant exists by ID
  boolean existsById(Long id);

  // Add a new restaurant
  void createRestaurant(Restaurant restaurant);

  List<Restaurant> findByBusinessOwner(BusinessOwner businessOwner);

  List<Restaurant> findByAddressZipcode(String zipcode);

  List<Restaurant> checkForDuplicateListings();

  void removeClosedRestaurant(Long restaurantId);
}
