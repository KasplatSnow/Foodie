package foodie.backend.repository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import foodie.backend.repository.Restaurant;
import foodie.backend.repository.RestaurantRegistrationRequest;
import foodie.backend.repository.RestaurantRepository;

/**
 * Service class that provides a Restaurant creation method for the db.
 * Also retrieves list of restaurants, updating owners, and deletion of restaurants
 */

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;
    
    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private CuisineRepository cuisineRepository;
    
    /**
     * Create a restaurant in the db using the restaurant object alongisde photos and cuisines.
     * 
     * @param restaurant
     * @param photos
     * @param cuisines
     */
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
    
    /**
     * Creates a shell restaurant in the db that can be updated with more info
     * 
     * @param shellRestaurant
     */
    public void createShellRestaurant(RestaurantRegistrationRequest shellRestaurant){
        restaurantRepository.saveShellRestaurant(shellRestaurant.getName(), shellRestaurant.getAddress(), shellRestaurant.getLng(), shellRestaurant.getLat());
    }
    
    /**
     * Updates a restaurant in the db using the ID and a request
     * 
     * @param restaurantID
     * @param updates
     * @return the updated restaurant
     */
    public Restaurant updateRestaurant(Long restaurantID, RestaurantRegistrationRequest updates) {
        Restaurant currentRestaurant = restaurantRepository.findByRestaurantID(restaurantID);
        if(updates.getName() != null){
            currentRestaurant.setName(updates.getName());
        }

        if(updates.getAddress() != null){
            currentRestaurant.setAddress(updates.getAddress());
        }

        if(updates.getPhoneNumber() != null){
            currentRestaurant.setPhoneNumber(updates.getPhoneNumber());
        }

        if(updates.getHours() != null){
            currentRestaurant.setHours(updates.getHours());
        }

        if(updates.getDescription() != null){
            currentRestaurant.setDescription(updates.getDescription());
        }

        if(!updates.getPhoto().isEmpty()){
            List<String> currentPhotos = photoRepository.findByRestaurantID(restaurantID);
            Set<String> currentPhotosSet = new HashSet<>(currentPhotos);
            Set<String> updatedPhotosSet = new HashSet<>(updates.getPhoto());

            //photos to Keep
            Set<String> photosToKeep = new HashSet<>(currentPhotosSet);
            photosToKeep.retainAll(updatedPhotosSet);

            //photos to remove
            Set<String> photosToRemove = new HashSet<>(currentPhotosSet);
            photosToRemove.removeAll(updatedPhotosSet);

            //photos to add
            Set<String> photosToAdd = new HashSet<>(updatedPhotosSet);
            photosToAdd.removeAll(currentPhotosSet);

            // Perform the database update
            if (!photosToRemove.isEmpty()) {
                for(String photo: photosToRemove){
                    photoRepository.deleteByRestaurantID(restaurantID, photo);
                }
            }
            if (!photosToAdd.isEmpty()) {
                for(String photo: photosToAdd){
                    Photo photoList = new Photo();
                    photoList.setPhoto(photo);
                    photoList.setRestaurant(restaurantRepository.findByRestaurantID(restaurantID));
                    photoRepository.save(photoList);
                }
            }
        }
        return restaurantRepository.save(currentRestaurant);
    }

    /**
     * Searches for restaurants in the DB by zipcode
     * 
     * @param zipCode
     * @return restaurant(s) with the associated zipcode
     */
    public List<Restaurant> getByZipCode(String zipCode){
        return restaurantRepository.findByZipCode(zipCode);
    }

    //finds restaurants in an address
    /**
     * Finds restaurants in the DB by real-life address
     * 
     * @param address
     * @return the restaurants
     */
    public List<Restaurant> getByAddress(String address) {
        return restaurantRepository.findByAddressContainingIgnoreCase(address);
    }

    //checks if an address already exists
    /**
     * Checks if the address exists in the DB
     * 
     * @param address
     * @return a boolean
     */
    public boolean getAddressExist(String address){
        return restaurantRepository.existsByAddress(address);
    }

    /**
     * Searches for restaurants with the same name as searched, in the db
     * 
     * @param name
     * @return the restaurants with the searched name
     */
    public List<Restaurant> getByName(String name) {
        return restaurantRepository.findByName(name);
    }

    /**
     * Gets all restaurants available publically in the db
     * 
     * @return the restaurant list
     */
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    /**
     * Deletes a restaurant by ID in the db
     * 
     * @param restaurantID
     */
    public void deleteById(Long restaurantID) {
        restaurantRepository.deleteById(restaurantID);
    }

    /**
     * Gets a restaurant by ID in the db
     * 
     * @param restaurantID
     * @return a restaurant
     */
    public Restaurant getByRestaurantID(Long restaurantID){
        return restaurantRepository.findByRestaurantID(restaurantID);
    }
    
    /**
     * Checks if a restaurant exists by a certain name and address(and deletes it?)
     * 
     * @param name
     * @param address
     * @return boolean if the restaurant exists
     */
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
        
    /**
     * Updates the owner of a restaurant by ID of owner and restaurant
     * 
     * @param businessOwnerID
     * @param restaurantID
     */
    public void setRestaurantOwner(Long businessOwnerID, Long restaurantID){
        restaurantRepository.updateOwner(businessOwnerID, restaurantID);
    }

    /**
     * Retrieves a restaurant in the db by name and address
     * 
     * @param name
     * @param address
     * @return the restaurant
     */
    public Restaurant getRestaurantByNameAndAddress(String name, String address){
        return restaurantRepository.findByNameContainingIgnoreCaseAndAddressContainingIgnoreCase(name, address);
    }
}
