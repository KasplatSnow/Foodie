package foodie.backend.repository;
import foodie.backend.repository.User;
import foodie.backend.repository.UserRepository;
import java.util.List;

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
    public User createUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Gets a list of users based on a username
     * 
     * @param username
     * @return list of users
     */
    public List<User> getUserByUsername(String username){
        return userRepository.findByUsername(username);
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
    public User getUserByID(Long userId){
        return userRepository.findByID(userId);
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
