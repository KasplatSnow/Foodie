package foodie.backend.repository;
import java.util.List;

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
    public List<Restaurant> getRestaurantByID(Long userID){
        return businessOwnerRepository.findRestaurantByOwnerID(userID);
    }

    /**
     * Finds the business owner in the db using the userID
     * 
     * @param userID the ID to find the business owner
     * @return the business owner object with ID
     */
    public BusinessOwner getBusinessOwnerByID(Long userID){
        return businessOwnerRepository.findBusinessOwnerByID(userID);
    }
}
