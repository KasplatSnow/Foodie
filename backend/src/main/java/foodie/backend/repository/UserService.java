package foodie.backend.repository;
import foodie.backend.repository.User;
import foodie.backend.repository.UserRepository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    } 
    
    // Create a new user
    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getUserByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    
    public List<User> getUserByID(Long userId){
        return userRepository.findByID(userId);
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public List<User> checkUserEmail(String email){
        return userRepository.findEmails(email);
    }
}
