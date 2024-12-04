package foodie.backend.controller;

import foodie.backend.model.BusinessOwner;
import foodie.backend.model.User;
import foodie.backend.model.UserRegistrationRequest;
import foodie.backend.repository.UserRepository;
import foodie.backend.service.UserService;

import java.util.stream.Collectors;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import foodie.backend.model.Admin;

@RestController
@RequestMapping("/api/users")
public class UserController {
  @Autowired
  private final UserService userService;

  public UserController(UserService userService){
    this.userService = userService;
  }

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
  
    @GetMapping("/getuserbyid/userID/{userID}")
    public List<UserDTO> getUserById(@PathVariable Long userID) {
        List<User> users = userService.getUserByID(userID);
        return users.stream().map(user -> new UserDTO(
            user.getUserID(),
            user.getUsername(),
            user.getRole().toString(),
            user.getPassword(),
            user.getEmail(),
            user.getAddress(),
            user.getPhoneNumber(),
            user.getReviewID())).collect(Collectors.toList());
    }
    
    @GetMapping("getuserbyusername/username/{username}")
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
            user.getReviewID())).collect(Collectors.toList());
    }
  
  @GetMapping("/allusers")
  List<User> getAllUsers() {
    return userService.getAllUsers();
  }
}

