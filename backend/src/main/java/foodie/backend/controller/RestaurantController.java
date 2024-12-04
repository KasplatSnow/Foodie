package foodie.backend.controller;

import foodie.backend.model.BusinessOwner;
import foodie.backend.model.Restaurant;
import foodie.backend.model.RestaurantRegistrationRequest;
import foodie.backend.service.RestaurantService;
import foodie.backend.repository.RestaurantRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {
  @Autowired
  private RestaurantService restaurantService;

    @GetMapping("/restaurantbyzipcode/{zipCode}")
    public List<RestaurantDTO> getRestaurantByZipCode(@PathVariable("zipCode") String zipCode) {
        List<Restaurant> restaurants = restaurantService.getByZipCode(zipCode);
        return restaurants.stream().map(restaurant -> new RestaurantDTO(
            restaurant.getRestaurantID(),
            restaurant.getName(),
            restaurant.getAddress(),
            restaurant.getZipCode(),
            restaurant.getPhoneNumber(),
            restaurant.getEmail(),
            restaurant.getCuisine(),
            restaurant.getHours(),
            restaurant.getDescription(),
            restaurant.getRating(),
            restaurant.getPrice(),
            restaurant.getOwnerID(),
            restaurant.getReviewID())).collect(Collectors.toList());

    }
    
    @GetMapping("/search/query/{query}")
    public List<RestaurantDTO> getRestaurantByName(@PathVariable String query) {
        List<Restaurant> restaurants = restaurantService.searchRestaurants(query);
        return restaurants.stream().map(restaurant -> new RestaurantDTO(
            restaurant.getRestaurantID(),
            restaurant.getName(),
            restaurant.getAddress(),
            restaurant.getPhoneNumber(),
            restaurant.getZipCode(),
            restaurant.getEmail(),
            restaurant.getCuisine(),
            restaurant.getHours(),
            restaurant.getDescription(),
            restaurant.getRating(),
            restaurant.getPrice(),
            restaurant.getOwnerID(),
            restaurant.getReviewID())).collect(Collectors.toList());
    }


    @PutMapping("update/restaurantid/{restaurantID}")
    public ResponseEntity<RestaurantDTO> putUpdateRestaurant(@PathVariable Long restaurantID, @RequestBody RestaurantRegistrationRequest updates) {
        Restaurant updateRestaurant = restaurantService.updateRestaurant(restaurantID,updates);
        RestaurantDTO updatedRestaurant = new RestaurantDTO(
            updateRestaurant.getRestaurantID(),
            updateRestaurant.getName(),
            updateRestaurant.getAddress(),
            updateRestaurant.getZipCode(),
            updateRestaurant.getPhoneNumber(),
            updateRestaurant.getEmail(),
            updateRestaurant.getCuisine(),
            updateRestaurant.getHours(),
            updateRestaurant.getDescription(),
            updateRestaurant.getRating(),
            updateRestaurant.getPrice(),
            updateRestaurant.getOwnerID(),
            updateRestaurant.getReviewID());
        return ResponseEntity.ok(updatedRestaurant);
    }
}
