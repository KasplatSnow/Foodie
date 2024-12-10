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

    @Autowired
    private BusinessOwnerService businessOwnerService;
  
    /**
     * Creates a restaurant using a request
     * 
     * @param registrationRequest
     * @return a response
     */
    @PostMapping("/register")
    public ResponseEntity<?> createRestaurant(@RequestBody RestaurantRegistrationRequest registrationRequest) {
        //check if restaurant already exists via
        if(restaurantService.getAddressExist(registrationRequest.getAddress())){
            return ResponseEntity.badRequest().body("Address is already registered");
        }

        //verify request
        if (registrationRequest.getEmail() == null || registrationRequest.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }
        if (registrationRequest.getZipCode() == null) { //in react, ensure an int
            return ResponseEntity.badRequest().body("Password is required");
        }
        if (registrationRequest.getName() == null || registrationRequest.getName().isEmpty()) {
            return ResponseEntity.badRequest().body("Role is required");
        }
        if (registrationRequest.getBusinessOwnerId() == 0) {
        return ResponseEntity.badRequest().body("Role is required");
        }
        if (registrationRequest.getAddress() == null || registrationRequest.getAddress().isEmpty()) {
            return ResponseEntity.badRequest().body("Role is required");
        }

        Restaurant newRestaurant = new Restaurant();
        newRestaurant.setBusinessOwner(businessOwnerService.getBusinessOwnerByID(registrationRequest.getBusinessOwnerId()));
        newRestaurant.setEmail(registrationRequest.getEmail());
        newRestaurant.setZipCode(registrationRequest.getZipCode());
        newRestaurant.setName(registrationRequest.getName());
        newRestaurant.setPhoneNumber(registrationRequest.getPhoneNumber());
        newRestaurant.setAddress(registrationRequest.getAddress());
        newRestaurant.setDescription(registrationRequest.getDescription());
        newRestaurant.setHours(registrationRequest.getHours());
        newRestaurant.setLng(registrationRequest.getLng());
        newRestaurant.setLat(registrationRequest.getLat());
        newRestaurant.setPrice(0);
        newRestaurant.setRating((float) 0);
        
        //send newly created restaurant to be saved, so new photos and cuisines can be added to their own tables
        restaurantService.createRestaurant(newRestaurant, registrationRequest.getPhoto(), registrationRequest.getCuisine());

        //return success message
        return ResponseEntity.ok("Registration successful");
    }

    /**
     * Gets a restaurant or list by zip code
     * 
     * @param zipCode
     * @return a list of restaurant data-transfer-objects
     */
    @GetMapping("/getrestaurant/restaurantbyzipcode/{zipCode}")
    public List<RestaurantDTO> getRestaurantByZipCode(@PathVariable String zipCode) {
        List<Restaurant> restaurants = restaurantService.getByZipCode(zipCode);
        return restaurants.stream().map(restaurant -> new RestaurantDTO(
            restaurant.getRestaurantID(),
            restaurant.getName(),
            restaurant.getAddress(),
            restaurant.getZipCode(),
            restaurant.getPhoneNumber(),
            restaurant.getEmail(),
            restaurant.getCuisine().stream().map(Cuisine::getCuisine).collect(Collectors.toList()),
            restaurant.getHours(),
            restaurant.getDescription(),
            restaurant.getRating(),
            restaurant.getPrice(),
            restaurant.getOwnerID(),
            restaurant.getPhoto().stream().map(Photo::getPhoto).collect(Collectors.toList()),
            restaurant.getLng(),
            restaurant.getLat(),
            restaurant.getReviewID())).collect(Collectors.toList());

    }
    
    /**
     * Get a list of restaurants by name
     * 
     * @param name
     * @return a list of restaurant data-transfer-objects
     */
    @GetMapping("/getrestaurant/restaurantbyname/{name}")/*ADDED */
    public List<RestaurantDTO> getRestaurantByName(@PathVariable String name) {
        List<Restaurant> restaurants = restaurantService.getByName(name);
        return restaurants.stream().map(restaurant -> new RestaurantDTO(
            restaurant.getRestaurantID(),
            restaurant.getName(),
            restaurant.getAddress(),
            restaurant.getZipCode(),
            restaurant.getPhoneNumber(),
            restaurant.getEmail(),
            restaurant.getCuisine().stream().map(Cuisine::getCuisine).collect(Collectors.toList()),
            restaurant.getHours(),
            restaurant.getDescription(),
            restaurant.getRating(),
            restaurant.getPrice(),
            restaurant.getOwnerID(),
            restaurant.getPhoto().stream().map(Photo::getPhoto).collect(Collectors.toList()),
            restaurant.getLng(),
            restaurant.getLat(),
            restaurant.getReviewID())).collect(Collectors.toList());
    }

    /**
     * Get a restaurant by ID
     * 
     * @param restaurantID
     * @return a restaurant data-transfer-objects
     */
    @GetMapping("/getrestaurant/restaurantbyid/{restaurantID}")
    public RestaurantDTO getRestaurantByName(@PathVariable Long restaurantID) {
        Restaurant restaurant = restaurantService.getByRestaurantID(restaurantID);
        return new RestaurantDTO(
            restaurant.getRestaurantID(),
            restaurant.getName(),
            restaurant.getAddress(),
            restaurant.getZipCode(),
            restaurant.getPhoneNumber(),
            restaurant.getEmail(),
            restaurant.getCuisine().stream().map(Cuisine::getCuisine).collect(Collectors.toList()),
            restaurant.getHours(),
            restaurant.getDescription(),
            restaurant.getRating(),
            restaurant.getPrice(),
            restaurant.getOwnerID(),
            restaurant.getPhoto().stream().map(Photo::getPhoto).collect(Collectors.toList()),
            restaurant.getLng(),
            restaurant.getLat(),
            restaurant.getReviewID());
    }
    
    /**
     * Update a restaurant using the ID and a request
     * 
     * @param restaurantID
     * @param updates
     * @return the response
     */
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
            updateRestaurant.getCuisine().stream().map(Cuisine::getCuisine).collect(Collectors.toList()),
            updateRestaurant.getHours(),
            updateRestaurant.getDescription(),
            updateRestaurant.getRating(),
            updateRestaurant.getPrice(),
            updateRestaurant.getOwnerID(),
            updateRestaurant.getPhoto().stream().map(Photo::getPhoto).collect(Collectors.toList()),
            updateRestaurant.getLng(),
            updateRestaurant.getLat(),
            updateRestaurant.getReviewID());
        return ResponseEntity.ok(updatedRestaurant);
    }

    /**
     * Get the list of all public restaurants in the db
     * 
     * @return the restaurant list
     */
    @GetMapping("/allrestaurants")
    public List<RestaurantDTO> getAllRestaurants(){
        List<Restaurant> restaurants = restaurantService.getAllRestaurants();
        return restaurants.stream().map(restaurant -> new RestaurantDTO(
        restaurant.getRestaurantID(),
        restaurant.getName(),
        restaurant.getAddress(),
        restaurant.getZipCode(),
        restaurant.getPhoneNumber(),
        restaurant.getEmail(),
        restaurant.getCuisine().stream().map(Cuisine::getCuisine).collect(Collectors.toList()),
        restaurant.getHours(),
        restaurant.getDescription(),
        restaurant.getRating(),
        restaurant.getPrice(),
        restaurant.getOwnerID(),
        restaurant.getPhoto().stream().map(Photo::getPhoto).collect(Collectors.toList()),
        restaurant.getLng(),
        restaurant.getLat(),
        restaurant.getReviewID())).collect(Collectors.toList());
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
