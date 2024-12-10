package foodie.backend.repository;

import foodie.backend.repository.BusinessOwner;
import foodie.backend.repository.User;
import foodie.backend.repository.UserRegistrationRequest;
import foodie.backend.repository.UserRepository;
import foodie.backend.repository.UserService;

import java.util.stream.Collectors;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import foodie.backend.repository.Admin;

/**
 * Controller class for handling API endpoints related to userss.
 * Provides functionality for registering users, getting users, and setting user profile picture.
 */

@RestController
@RequestMapping("/api/users")
public class UserController {
  @Autowired
  private final UserService userService;

  /**
   * Constructs the user controller using the user service
   * 
   * @param userService
   */
  public UserController(UserService userService){
    this.userService = userService;
  }

  /**
   * Registers a user using a request and returns a response. Otherwise, returns an error response.
   * 
   * @param registrationRequest
   * @return a response
   */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationRequest registrationRequest) {
        //verify request
        if (registrationRequest.getEmail() == null || registrationRequest.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }
        if (registrationRequest.getPassword() == null || registrationRequest.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Password is required");
        }
        if (registrationRequest.getRole() == null || registrationRequest.getRole().isEmpty()) {
            return ResponseEntity.badRequest().body("Role is required");
        }

        //check if user already exists via
        if (userService.getUserByEmail(registrationRequest.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }

        //create User obj then check role to determine type, then set data
        User newUser;
        String role = registrationRequest.getRole();
        if(role.equals("USER")){
          newUser = new User();
        }
        else if(role.equals("BUSINESS")){
          newUser = new BusinessOwner();
        }
        else if (role.equals("ADMIN")){
          newUser = new Admin();
        }
        else{
          return ResponseEntity.badRequest().body("Invalid User Type");

        }
        newUser.setEmail(registrationRequest.getEmail());
        newUser.setPassword(registrationRequest.getPassword());
        newUser.setUsername(registrationRequest.getUsername());
        newUser.setPhoneNumber(registrationRequest.getPhoneNumber());
        
        //save the user to the database
        userService.createUser(newUser);

        //return success message
        return ResponseEntity.ok("Registration successful");
    }
  
    /**
     * Gets a UserDTO by userID
     * 
     * @param userID
     * @return a userDTO object
     */
    @GetMapping("/getuserbyid/userID/{userID}")
    public UserDTO getUserById(@PathVariable Long userID) {
        User user = userService.getUserByID(userID);
        return new UserDTO(
            user.getUserID(),
            user.getUsername(),
            user.getRole().toString(),
            user.getPassword(),
            user.getEmail(),
            user.getAddress(),
            user.getPhoneNumber(),
            user.getReviewID(),
            user.getPfp());
    }
    
    /**
     * Gets a list of possible users by username
     * 
     * @param username
     * @return a list of userDTOs
     */
    @GetMapping("/getuserbyusername/username/{username}")
    public List<UserDTO> getUserByUsername(@PathVariable String username) {
        List<User> users = userService.getUserByUsername(username);
        return users.stream().map(user -> new UserDTO(
            user.getUserID(),
            user.getUsername(),
            user.getRole().toString(),
            user.getPassword(),
            user.getEmail(),
            user.getAddress(),
            user.getPhoneNumber(),
            user.getReviewID(),
            user.getPfp())).collect(Collectors.toList());
    }
  
    /**
     * Gets all the users in a list
     * 
     * @return a list of users
     */
  @GetMapping("/allusers")
  List<User> getAllUsers() {
    return userService.getAllUsers();
  }

    /**
     * Sets the profile picture of the user and returns a response
     * 
     * @param pfp
     * @param userID
     * @return a response
     */
    @PutMapping("/setpfp/pfp/{pfp}/userID/{userID}")
    public ResponseEntity<?> setUserPfp(@PathVariable String pfp, @PathVariable Long userID){
        userService.setUserPfp(pfp, userID);
        return ResponseEntity.ok("Pfp set");
    }
}

