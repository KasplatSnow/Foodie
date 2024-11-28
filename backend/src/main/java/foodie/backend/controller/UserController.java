package foodie.backend.controller;

import foodie.backend.model.BusinessOwner;
import foodie.backend.model.User;
import foodie.backend.model.UserRegistrationRequest;
import foodie.backend.repository.UserRepository;
import foodie.backend.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        // Validate the incoming request
        if (registrationRequest.getEmail() == null || registrationRequest.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }
        if (registrationRequest.getPassword() == null || registrationRequest.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Password is required");
        }
        if (registrationRequest.getRole() == null || registrationRequest.getRole().isEmpty()) {
            return ResponseEntity.badRequest().body("Role is required");
        }

        // Check if user already exists
        if (userService.getUserByEmail(registrationRequest.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }

        // Create a new User object to save
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
        
        // Save the user to the database
        userService.createUser(newUser);

        // Return success message
        return ResponseEntity.ok("Registration successful");
    }

  @GetMapping("/allusers")
  List<User> getAllUsers() {
    return userService.getAllUsers();
  }
}

