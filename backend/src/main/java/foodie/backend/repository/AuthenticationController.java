package foodie.backend.repository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private UserService userService;

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
