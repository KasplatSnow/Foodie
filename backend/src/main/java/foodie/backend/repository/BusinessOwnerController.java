package foodie.backend.repository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import foodie.backend.repository.BusinessOwner;
import foodie.backend.repository.Restaurant;
import foodie.backend.repository.BusinessOwnerRepository;
import foodie.backend.repository.BusinessOwnerService;
import foodie.backend.repository.RestaurantService;

@RestController
@RequestMapping("/api/business-owner")
public class BusinessOwnerController {
  
    @Autowired
    private BusinessOwnerService businessOwnerService;
    
    //get All restaurants of a BusinessOwner
    @GetMapping("/getrestaurants/userID/{userID}")
    public List<RestaurantDTO> getRestaurantsByID(@PathVariable Long userID) {
        List<Restaurant> restaurants = businessOwnerService.getRestaurantByID(userID);

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

    //gets ALL BusinessOwner details
    //check if has userID property(if wanting to check properties)
    @GetMapping("/getbusinessowner/userID/{userID}")
    public BusinessOwnerDTO getBusinessOwnerByID(@PathVariable Long userID) {
        BusinessOwner businessOwner = businessOwnerService.getBusinessOwnerByID(userID);
        return new BusinessOwnerDTO(
            businessOwner.getUserID(),
            businessOwner.getUsername(),
            businessOwner.getAddress(),
            businessOwner.getPhoneNumber(),
            businessOwner.getEmail(),
            businessOwner.getRestaurantID());
    }
}
