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

/**
 * Controller class for handling API endpoints related to business owners.
 * Provides functionality for retrieving business owner details and details for the restaurants they own.
 */

@RestController
@RequestMapping("/api/business-owner")
public class BusinessOwnerController {
  
    @Autowired
    private BusinessOwnerService businessOwnerService;
    
    //get All restaurants of a BusinessOwner
    /**
     * Endpoint to retrieve a list of all restaurants and their details. 
     * For business owners.
     * 
     * @param userID the business owner ID
     * @return  the list of restaurants and their details
     */
    @GetMapping("/getrestaurants/userID/{userID}")
    public List<RestaurantDTO> getRestaurantsByID(@PathVariable Long userID) {
        return businessOwnerService.getRestaurantByID(userID);
    }

    //gets ALL BusinessOwner details
    //check if has userID property(if wanting to check properties)
    /**
     * Endpoint to retrieve the details of a specific business owner by their user ID.
     * 
     * @param userID the unique ID of the business owner
     * @return a BusinessOwnerDTO object with the business owner's details
     */
    @GetMapping("/getbusinessowner/userID/{userID}")
    public BusinessOwnerDTO getBusinessOwnerByID(@PathVariable Long userID) {
        return businessOwnerService.getBusinessOwnerByID(userID);
    }
}
