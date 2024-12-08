package foodie.backend.controller;

import java.util.List;

import foodie.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import foodie.backend.model.Restaurant;
import foodie.backend.model.User;
import foodie.backend.service.RestaurantService;
import foodie.backend.service.UserService;
 
@RestController
@RequestMapping("/admin")
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
    @GetMapping("deleterestaurant/restaurantID/{restaurantID}")
    public ResponseEntity<?> removeClosedRestaurant(@PathVariable Long restaurantID) {
        restaurantService.deleteById(restaurantID);
        return ResponseEntity.ok("Restaurant Deleted successfully");
    }
}