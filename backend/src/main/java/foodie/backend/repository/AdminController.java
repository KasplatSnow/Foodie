package foodie.backend.repository;

import java.util.List;

import foodie.backend.repository.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import foodie.backend.repository.Restaurant;
import foodie.backend.repository.User;
import foodie.backend.repository.RestaurantService;
import foodie.backend.repository.UserService;
 
/**
 * The AdminController class handles admin functionalities 
 * for restaurant management. It provides endpoints to check 
 * for duplicate restaurants and remove closed restaurants.
 */

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private RestaurantService restaurantService;

/*STILL SPECIFYING */
/*Could have the repo method return restaurant entities, 
then the service method check the length of the returning restaurant array.
If the array is greater than 1 , compares the ID's and deletes a restaurant using the deleteById()
 */
    /**
     * Endpoint to check if a restaurant with the same name and address 
     * exists and delete it if it does.
     *
     * @param name the name of the restaurant to check
     * @param address the address of the restaurant to check
     * @return ResponseEntity containing a success message if duplicate found and deleted,
     *         or says if no duplicate was found.
     */
    @GetMapping("/checkDupe/name/{name}/address/{address}")
    public ResponseEntity<?> checkDupe(@PathVariable String name, @PathVariable String address) {
        if(restaurantService.checkExistByNameAndAddress(name, address)){
            return ResponseEntity.ok("Duplicate Restaurant Deleted successfully");
        }
        else{
            return ResponseEntity.ok("No Duplicate Found");
        }
    }
    
      // Remove a restaurant if it closes down
 /**
     * Endpoint to remove a restaurant from the system based on its ID.
     *
     * @param restaurantID the ID of the restaurant to be deleted
     * @return ResponseEntity with a success message indicating the restaurant has been deleted.
     */
    @DeleteMapping("deleterestaurant/restaurantID/{restaurantID}")
    public ResponseEntity<?> removeClosedRestaurant(@PathVariable Long restaurantID) {
        restaurantService.deleteById(restaurantID);
        return ResponseEntity.ok("Restaurant Deleted successfully");
    }
}
