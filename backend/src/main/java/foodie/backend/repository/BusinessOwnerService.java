package foodie.backend.repository;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import foodie.backend.repository.Restaurant;
import foodie.backend.repository.BusinessOwner;
import foodie.backend.repository.BusinessOwnerRepository;


/**
 * Service class that provides a Business Owner creation method for the db.
 * Also retrieves list of restaurants and business owner
 */
@Service
public class BusinessOwnerService {

    @Autowired
    private BusinessOwnerRepository businessOwnerRepository;

    // Create a new business owner
    /**
     * Creates a new business owner in the db
     * 
     * @param businessOwner owner to be created
     * @return the created object with the ID
     */
    public BusinessOwner createBusinessOwner(BusinessOwner businessOwner) {
        return businessOwnerRepository.save(businessOwner);
    }
    
    /**
     * Finds the list of restaurants owned by the business owner using ID
     * 
     * @param userID the ID of the business owner
     * @return the list of restaurants owned
     */
    public List<RestaurantDTO> getRestaurantByID(Long userID){
        List<Restaurant> restaurants = businessOwnerRepository.findRestaurantByOwnerID(userID);
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
     * Finds the business owner in the db using the userID
     * 
     * @param userID the ID to find the business owner
     * @return the business owner object with ID
     */
    public BusinessOwnerDTO getBusinessOwnerByID(Long userID){
        BusinessOwner businessOwner = businessOwnerRepository.findBusinessOwnerByID(userID);
        return new BusinessOwnerDTO(
            businessOwner.getUserID(),
            businessOwner.getUsername(),
            businessOwner.getAddress(),
            businessOwner.getPhoneNumber(),
            businessOwner.getEmail(),
            businessOwner.getRestaurantID());
    }
}
