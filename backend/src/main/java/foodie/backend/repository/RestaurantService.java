package foodie.backend.repository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;

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
    
    @Autowired
    private BusinessOwnerRepository businessOwnerRepository;
    /**
     * Create a restaurant in the db using the restaurant object alongisde photos and cuisines.
     * 
     * @param restaurant
     * @param photos
     * @param cuisines
     */
    public ResponseEntity<?> createRestaurant(RestaurantRegistrationRequest registrationRequest) {
        List<String> photos = registrationRequest.getPhoto();
        List<String> cuisines = registrationRequest.getCuisine();

        //check if restaurant already exists via
        if(getAddressExist(registrationRequest.getAddress())){
            return ResponseEntity.badRequest().body("Address is already registered");
        }

        //verify request
        if (registrationRequest.getEmail() == null || registrationRequest.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }
        if (registrationRequest.getZipCode() == null) { //in react, ensure an int
            return ResponseEntity.badRequest().body("Password is required");
        }
        if (registrationRequest.getName() == null || registrationRequest.getName().isEmpty()) {
            return ResponseEntity.badRequest().body("Role is required");
        }
        if (registrationRequest.getBusinessOwnerId() == null) {
        return ResponseEntity.badRequest().body("Role is required");
        }
        if (registrationRequest.getAddress() == null || registrationRequest.getAddress().isEmpty()) {
        return ResponseEntity.badRequest().body("Role is required");
        }
        
        //Creates new Restaurantt Entity
        Restaurant newRestaurant = new Restaurant();
        newRestaurant.setBusinessOwner(businessOwnerRepository.findBusinessOwnerByID(registrationRequest.getBusinessOwnerId()));
        newRestaurant.setEmail(registrationRequest.getEmail());
        newRestaurant.setZipCode(registrationRequest.getZipCode());
        newRestaurant.setName(registrationRequest.getName());
        newRestaurant.setPhoneNumber(registrationRequest.getPhoneNumber());
        newRestaurant.setAddress(registrationRequest.getAddress());
        newRestaurant.setDescription(registrationRequest.getDescription());
        newRestaurant.setRating(registrationRequest.getRating());
        newRestaurant.setPrice(registrationRequest.getPrice());
        newRestaurant.setHours(registrationRequest.getHours());
        newRestaurant.setLng(registrationRequest.getLng());
        newRestaurant.setLat(registrationRequest.getLat());
        restaurantRepository.save(newRestaurant);

        // Save cuisines
        for (String cuisine : cuisines) {
            Cuisine cuisineList = new Cuisine();
            cuisineList.setCuisine(cuisine);
            cuisineList.setRestaurant(newRestaurant);
            cuisineRepository.save(cuisineList);
        }
        
        // Save photos
        for (String photo : photos) {
            Photo photoList = new Photo();
            photoList.setPhoto(photo);
            photoList.setRestaurant(newRestaurant);
            photoRepository.save(photoList);
        }

        return ResponseEntity.ok("Registration successful");
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
    Restaurant updateRestaurant(Long restaurantID, RestaurantRegistrationRequest updates) {
        Restaurant currentRestaurant = restaurantRepository.findByRestaurantID(restaurantID); //.orElseThrow(() -> new RuntimeException("Restaurant Not Found"));
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
    public List<RestaurantDTO> getByZipCode(String zipCode){
        List<Restaurant> restaurants = restaurantRepository.findByZipCode(zipCode);
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
    public List<RestaurantDTO> getByName(String name) {
        List<Restaurant> restaurants = restaurantRepository.findByName(name);
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
     * Gets all restaurants available publically in the db
     * 
     * @return the restaurant list
     */
    public List<RestaurantDTO> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantRepository.findAll();
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
    public RestaurantDTO getByRestaurantID(Long restaurantID){
        Restaurant restaurant = restaurantRepository.findByRestaurantID(restaurantID);
        return new RestaurantDTO(
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
            restaurant.getReviewID());
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
