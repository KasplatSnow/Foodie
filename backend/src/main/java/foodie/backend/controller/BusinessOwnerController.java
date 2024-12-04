package foodie.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/business-owner")
public class BusinessOwnerController {
  
    @GetMapping("/getrestaurants/userID/{userID}")
    public List<RestaurantDTO> getRestaurantsByID(@PathVariable("userID") Long userID) {
        List<Restaurant> restaurants = businessOwnerService.getRestaurantByID(userID);

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

    //gets ALL BusinessOwner details
    //check if has userID property(if wanting to check properties)
    @GetMapping("/getbusinessowner/userID/{userID}")
    public List<BusinessOwnerDTO> getBusinessOwnerByID(@PathVariable("userID") Long userID) {
        List<BusinessOwner> businessOwners = businessOwnerService.getBusinessOwnerByID(userID);
        return businessOwners.stream().map(businessOwner -> new BusinessOwnerDTO(
            businessOwner.getUserID(),
            businessOwner.getUsername(),
            businessOwner.getAddress(),
            businessOwner.getPhoneNumber(),
            businessOwner.getEmail(),
            businessOwner.getRestaurantID())).collect(Collectors.toList());
    }
}
