package foodie.backend.repository;

import foodie.backend.repository.User;
import foodie.backend.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class that provides a User creation method for the db.
 * Also retrieves users, list of users, check email, and set user profile picture
 */

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    /**
     * Constructs a UserService object using userRepository
     * 
     * @param userRepository
     */
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    } 
    
    // Create a new user
    /**
     * Creates a new user using a user object
     * 
     * @param user
     * @return the user object
     */
    public ResponseEntity<?> createUser(UserRegistrationRequest registrationRequest) {
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
        if (!checkUserEmail(registrationRequest.getEmail()).isEmpty()) {
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

        userRepository.save(newUser);
        return ResponseEntity.ok("Registration successful");
    }

    /**
     * Gets a list of users based on a username
     * 
     * @param username
     * @return list of users
     */
    public List<UserDTO> getUserByUsername(String username){
        List<User> users = userRepository.findByUsername(username);
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
     * Gets a list of all users in the repository/db
     * 
     * @return a user list
     */
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    
    /**
     * Get user by userID in db
     * 
     * @param userId
     * @return the user
     */
    public UserDTO getUserByID(Long userId){
        User user = userRepository.findByID(userId);
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
     * Gets user by email in db
     * 
     * @param email
     * @return the user
     */
    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    /**
     * Checks if there is a user associated with an email and retrieves a list if so
     * 
     * @param email
     * @return lit of users
     */
    public List<User> checkUserEmail(String email){
        return userRepository.findEmails(email);
    }
    
    /**
     * Sets the user's profile picture using the profile picture string and userID
     * 
     * @param pfp
     * @param userID
     */
    public void setUserPfp(String pfp, Long userID){
        userRepository.updatePfp(pfp, userID);
    }
}
