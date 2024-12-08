package foodie.backend.repository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import foodie.backend.repository.Restaurant;
import foodie.backend.repository.BusinessOwner;
import foodie.backend.repository.BusinessOwnerRepository;

@Service
public class BusinessOwnerService {

    @Autowired
    private BusinessOwnerRepository businessOwnerRepository;

    // Create a new business owner
    public BusinessOwner createBusinessOwner(BusinessOwner businessOwner) {
        return businessOwnerRepository.save(businessOwner);
    }
    
    public List<Restaurant> getRestaurantByID(Long userID){
        return businessOwnerRepository.findRestaurantByOwnerID(userID);
    }

    public BusinessOwner getBusinessOwnerByID(Long userID){
        return businessOwnerRepository.findBusinessOwnerByID(userID);
    }
}
