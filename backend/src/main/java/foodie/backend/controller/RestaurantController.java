package foodie.backend.controller;

import foodie.backend.model.BusinessOwner;
import foodie.backend.model.Restaurant;
import foodie.backend.model.RestaurantRegistrationRequest;
import foodie.backend.service.RestaurantService;
import foodie.backend.repository.RestaurantRepository;
import foodie.backend.service.BusinessOwnerService;

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
@RequestMapping("/api/restaurants")
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private BusinessOwnerService businessOwnerService;
  
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
        newRestaurant.setCuisine(registrationRequest.getCuisine());
        newRestaurant.setDescription(registrationRequest.getDescription());
        newRestaurant.setHours(registrationRequest.getHours());
        newRestaurant.setPhoto(registrationRequest.getPhoto());
        newRestaurant.setLng(registrationRequest.getLng());
        newRestaurant.setLat(registrationRequest.getLat());
        //save the user to the database
        restaurantService.createRestaurant(newRestaurant);

        //return success message
        return ResponseEntity.ok("Registration successful");
    }

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
            restaurant.getCuisine(),
            restaurant.getHours(),
            restaurant.getDescription(),
            restaurant.getRating(),
            restaurant.getPrice(),
            restaurant.getOwnerID(),
            restaurant.getPhoto(),
            restaurant.getLng(),
            restaurant.getLat(),
            restaurant.getReviewID())).collect(Collectors.toList());

    }
    
    @GetMapping("/search/query/{query}")
    public List<RestaurantDTO> getRestaurantSearch(@PathVariable String query) {
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
            restaurant.getPhoto(),
            restaurant.getLng(),
            restaurant.getLat(),
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
            restaurant.getPhoto(),
            restaurant.getLng(),
            restaurant.getLat(),
            updateRestaurant.getReviewID());
        return ResponseEntity.ok(updatedRestaurant);
    }

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
        restaurant.getCuisine(),
        restaurant.getHours(),
        restaurant.getDescription(),
        restaurant.getRating(),
        restaurant.getPrice(),
        restaurant.getOwnerID(),
        restaurant.getPhoto(),
        restaurant.getLng(),
        restaurant.getLat(),
        restaurant.getReviewID())).collect(Collectors.toList());
    }
}
