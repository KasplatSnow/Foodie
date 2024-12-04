package foodie.backend.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import foodie.backend.model.Restaurant;
import foodie.backend.model.BusinessOwner;
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

    public List<BusinessOwner> getBusinessOwnerByID(Long userID){
        return businessOwnerRepository.findBusinessOwnerByID(userID);
    }
}
