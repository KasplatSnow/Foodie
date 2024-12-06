package foodie.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import foodie.backend.model.Restaurant;
import foodie.backend.model.RestaurantRegistrationRequest;
import foodie.backend.repository.RestaurantRepository;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;
/*
 * FIGURE OUT WHY JPA CANT FIND A FLOAT WITH A DEMICAL PLACE
 * AND
 * DIFFERENTIATE INT FROM FLOAT FOR PRICE AND RATING
 *
 */

    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }
    
    public List<Restaurant> searchRestaurants(String query){
        if(query != null){
            if(isFloat(query)){
                Float rating = Float.parseFloat(query);
                return restaurantRepository.findByRating(rating);
            }
            else if(isInteger(query)){
                Integer price = Integer.parseInt(query);
                return restaurantRepository.findByPrice(price);
            }
            else{
                return restaurantRepository.findByNameContainingIgnoreCaseOrCuisineContainingIgnoreCase(query, query);
            }
        }
        return List.of();
    }

    public Restaurant updateRestaurant(Long restaurantID, RestaurantRegistrationRequest updates) {
        Restaurant currentRestaurant = restaurantRepository.findByRestaurantID(restaurantID); //.orElseThrow(() -> new RuntimeException("Restaurant Not Found"));
        currentRestaurant.setName(updates.getName());
        currentRestaurant.setAddress(updates.getAddress());
        currentRestaurant.setPhoneNumber(updates.getPhoneNumber());
        currentRestaurant.setHours(updates.getHours());
        currentRestaurant.setDescription(updates.getDescription());

        return restaurantRepository.save(currentRestaurant);
    }

    public List<Restaurant> getByZipCode(String zipCode){
        return restaurantRepository.findByZipCode(zipCode);
    }

    //finds restaurants in an address
    public List<Restaurant> getByAddress(String address) {
        return restaurantRepository.findByAddressContainingIgnoreCase(address);
    }

    //checks if an address already exists
    public boolean getAddressExist(String address){
        return restaurantRepository.existsByAddress(address);
    }

    public List<Restaurant> getByName(String name) {
        return restaurantRepository.findByName(name);
    }

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public void deleteById(Long restaurantID) {
        restaurantRepository.deleteById(restaurantID);
    }

    public Restaurant getByRestaurantID(Long restaurantID){
        return restaurantRepository.findByRestaurantID(restaurantID);
    }
    
/*STILL SPECIFYING */
    public boolean checkExistByNameAndAddress(String name, String address){
        return restaurantRepository.existsByNameContainingIgnoreCaseAndAddressContainingIgnoreCase(name, address);
    }

    private boolean isFloat(String string){
        try{
            Float.parseFloat(string);
            return true;
        }
        catch(NumberFormatException e){
            return false;
        }
    }

    private boolean isInteger(String string){
        try{
            Integer.parseInt(string);
            return true;
        }
        catch(NumberFormatException e){
            return false;
        }
    }
}
