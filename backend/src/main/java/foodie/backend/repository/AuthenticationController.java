package foodie.backend.repository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Controller class for handling login auth using "/api/auth" and "/login"
 */

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private UserService userService;

    /**
     * Endpoint for user login. Validates the provided email, password, and role.
     * If the info is correct, an AuthDTO with the user's ID and role is returned.
     * Otherwise, returns a 4XX error status or error.
     * 
     * @param loginRequest the login request containing the user's email, password, and role
     * @return a ResponseEntity containing the login response or an error message
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        //extract email, password, and role from the request body
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        String role = loginRequest.getRole();

        User user = userService.getUserByEmail(email);
        
        if(user == null){
            return ResponseEntity.status(404).body("Email does not exist");
        }
        //simple login validation (replace with database or service call)
        if (email.equals(user.getEmail()) && password.equals(user.getPassword())) {
            
            //check role and return a corresponding response
            if (role.equals(user.getRole().toString())) {
                // Create response object
                AuthDTO loginResponse = new AuthDTO(user.getUserID(), user.getRole().toString());
                return ResponseEntity.ok(loginResponse);
            }else{
                return ResponseEntity.badRequest().body("Invalid role");
            }
        } else {
            //invalid credentials
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}
