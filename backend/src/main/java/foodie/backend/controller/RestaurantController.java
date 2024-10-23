package foodie.backend.controller;

import foodie.backend.model.BusinessOwner;
import foodie.backend.model.Restaurant;
import foodie.backend.repository.RestaurantRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {
  @Autowired
  private RestaurantRepository restaurantService;

  @GetMapping("/{id}")
  public Restaurant getRestaurant(@PathVariable Long id) {
    return restaurantService.findByID(id);
  }

  @PostMapping
  public Restaurant createRestaurant(@RequestBody Restaurant restaurant) {
    return restaurantService.save(restaurant);
  }

  // Search by location (zipcode)
  public List<Restaurant> searchByLocation(String zipcode) {
    return restaurantService.findByAddressZipcode(zipcode);
  }

  // Remove a restaurant if it closes down
  public void removeClosedRestaurant(Long userID, Long restaurantId) {
    restaurantService.deleteById(restaurantId);
  }

  // Get restaurants owned by a specific business owner
  public List<Restaurant> getOwnedRestaurants(BusinessOwner businessOwner) {
    return restaurantService.findByBusinessOwner(businessOwner);
  }
}
