package foodie.backend.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import foodie.backend.model.LoginRequest;
import foodie.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import foodie.backend.model.User;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private UserService userService;

    //this is a simple in-memory user storage for demonstration purposes
    private static final String VALID_EMAIL = "user@example.com";
    private static final String VALID_PASSWORD = "password123";

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        //extract email, password, and role from the request body
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        String role = loginRequest.getRole();

        User user = userService.getUserByEmail(email);

        //simple login validation (replace with database or service call)
        if (email.equals(user.getEmail()) && password.equals(user.getPassword())) {
            
            //check role and return a corresponding response
            if (role.equals(user.getRole().toString())) {
                return ResponseEntity.ok("Login successful");
            }else{
                return ResponseEntity.badRequest().body("Invalid role");
            }
        } else {
            //invalid credentials
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}
