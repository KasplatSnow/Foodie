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
    
    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private CuisineRepository cuisineRepository;
    
    public void createRestaurant(Restaurant restaurant, List<String> photos, List<String> cuisines) {
        restaurantRepository.save(restaurant);

        // Save cuisines
        for (String cuisine : cuisines) {
            Cuisine cuisineList = new Cuisine();
            cuisineList.setCuisine(cuisine);
            cuisineList.setRestaurant(restaurant);
            cuisineRepository.save(cuisineList);
        }
        
        // Save photos
        for (String photo : photos) {
            Photo photoList = new Photo();
            photoList.setPhoto(photo);
            photoList.setRestaurant(restaurant);
            photoRepository.save(photoList);
        }
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
    
    public boolean checkExistByNameAndAddress(String name, String address){
        List<Restaurant> restaurants = restaurantRepository.existsByNameContainingIgnoreCaseAndAddressContainingIgnoreCase(name, address);
        if(restaurants.size() > 1){
            for(int i = 1; i < restaurants.size(); i++){
                restaurantRepository.deleteById(restaurants.get(i).getRestaurantID());
            }
            return true;
        }
        return false;    
    }
}
