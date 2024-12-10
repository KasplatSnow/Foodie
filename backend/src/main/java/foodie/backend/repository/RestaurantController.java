package foodie.backend.repository;

import foodie.backend.repository.BusinessOwner;
import foodie.backend.repository.RestaurantRegistrationRequest;
import foodie.backend.repository.BusinessOwnerService;

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

/**
 * Controller class for handling API endpoints related to restaurants.
 * Provides functionality for creating restaurants, getting restaurants, updating restaurants, and setting the owner for a restaurant.
 */

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;
  
    /**
     * Creates a restaurant using a request
     * 
     * @param registrationRequest
     * @return a response
     */
    @PostMapping("/register")
    public ResponseEntity<?> createRestaurant(@RequestBody RestaurantRegistrationRequest registrationRequest) {
            return restaurantService.createRestaurant(registrationRequest);
    }

    /**
     * Gets a restaurant or list by zip code
     * 
     * @param zipCode
     * @return a list of restaurant data-transfer-objects
     */
    @GetMapping("/getrestaurant/restaurantbyzipcode/{zipCode}")
    public List<RestaurantDTO> getRestaurantByZipCode(@PathVariable("zipCode") String zipCode) {
        return restaurantService.getByZipCode(zipCode);
    }
    
    /**
     * Get a list of restaurants by name
     * 
     * @param name
     * @return a list of restaurant data-transfer-objects
     */
    @GetMapping("/getrestaurant/restaurantbyname/{name}")
    public List<RestaurantDTO> getRestaurantByName(@PathVariable String name) {
        return restaurantService.getByName(name);
    }

    /**
     * Get a restaurant by ID
     * 
     * @param restaurantID
     * @return a restaurant data-transfer-objects
     */
    @GetMapping("/getrestaurant/restaurantbyid/{restaurantID}")
    public RestaurantDTO getRestaurantByID(@PathVariable Long restaurantID) {
        return restaurantService.getByRestaurantID(restaurantID);
    }
    
    /**
     * Update a restaurant using the ID and a request
     * 
     * @param restaurantID
     * @param updates
     * @return the response
     */
    @PutMapping("update/restaurantid/{restaurantID}")
    public ResponseEntity<?> putUpdateRestaurant(@PathVariable Long restaurantID, @RequestBody RestaurantRegistrationRequest updates) {
        Restaurant updateRestaurant = restaurantService.updateRestaurant(restaurantID, updates);
        return ResponseEntity.ok(updateRestaurant);
    }

    /**
     * Get the list of all public restaurants in the db
     * 
     * @return the restaurant list
     */
    @GetMapping("/allrestaurants")/*ADDED */
    public List<RestaurantDTO> getAllRestaurants(){
        return restaurantService.getAllRestaurants();
    }
    
    /**
     * Sets the owner of the restaurant using owner ID and restaurant ID
     * 
     * @param businessOwnerID
     * @param restaurantID
     * @return the response
     */
    @PutMapping("setOwner/businessOwnerId/{businessOwnerID}/restaurantID/{restaurantID}")
    public ResponseEntity<?> setOwnerForRestaurant(@PathVariable Long businessOwnerID, @PathVariable Long restaurantID) {
        restaurantService.setRestaurantOwner(businessOwnerID, restaurantID);        
        return ResponseEntity.ok("Set BusinessOwner");
    }
}
