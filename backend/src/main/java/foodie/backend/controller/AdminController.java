package foodie.backend.controller;

import foodie.backend.model.Restaurant;
import foodie.backend.model.User;
import foodie.backend.repository.RestaurantRepository;
import foodie.backend.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {
  @Autowired
  private RestaurantRepository restaurantService;

  @Autowired
  private UserRepository userService;

  // Method to check for duplicate listings
  @GetMapping("/restaurants/check-duplicates")
  public ResponseEntity<List<Restaurant>> checkForDuplicateListings() {
    List<Restaurant> duplicateRestaurants = restaurantService.checkForDuplicateListings();
    return new ResponseEntity<>(duplicateRestaurants, HttpStatus.OK);
  }

  // Method to remove a closed restaurant
  @DeleteMapping("/restaurants/{userID}/{restaurantId}")
  public ResponseEntity<String> removeClosedRestaurant(
    @PathVariable Long userID,
    @PathVariable Long restaurantID
  ) {
    User user = userService.findByUserID(userID);

    // check if the user exist in database
    if (user == null) {
      return ResponseEntity.badRequest().body("User not found.");
    }

    // only admins are allowed to remove a restaurant
    if (user.getRole() != "admin") {
      return ResponseEntity.badRequest().body("User do not have permission.");
    }
    restaurantService.removeClosedRestaurant(restaurantID);
    //still need to check if successfully delete restaruant or not
    // more code here
    return ResponseEntity.ok().body("Successfully removed restaurant.");
  }
}
