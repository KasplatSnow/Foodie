package foodie.backend.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import foodie.backend.repository.Restaurant;
import foodie.backend.repository.RestaurantRegistrationRequest;
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
    
    public void createShellRestaurant(RestaurantRegistrationRequest shellRestaurant){
        restaurantRepository.saveShellRestaurant(shellRestaurant.getName(), shellRestaurant.getAddress(), shellRestaurant.getLng(), shellRestaurant.getLat());
    }
    
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
        
    public void setRestaurantOwner(Long businessOwnerID, Long restaurantID){
        restaurantRepository.updateOwner(businessOwnerID, restaurantID);
    }

    public Restaurant getRestaurantByNameAndAddress(String name, String address){
        return restaurantRepository.findByNameContainingIgnoreCaseAndAddressContainingIgnoreCase(name, address);
    }
}
