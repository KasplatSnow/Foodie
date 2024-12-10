package foodie.backend.repository;

/**
 * Class used to create an object that stores user creation information for requests
 */

public class UserRegistrationRequest {

    private String email;
    private String username;
    private String password;
    private String role;
    private String phoneNumber;

    // Getters and Setters
    /**
     * Gets the user's email
     * 
     * @return the user's email
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the user's email
     * 
     * @param email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets the username of the user
     * 
     * @return the username string
     */
    public String getUsername(){
        return username;
    }

    /**
     * Sets the username of the user
     * 
     * @param username
     */
    public void setUsername(String username){
        this.username = username;
    }

    /**
     * Gets the user's password
     * 
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the user's password
     * 
     * @param password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Gets the role of the user
     * 
     * @return the role
     */
    public String getRole() {
        return role;
    }

    /**
     * Sets the user's role
     * 
     * @param role
     */
    public void setRole(String role) {
        this.role = role;
    }

    /**
     * Gets the phone number of the user
     * 
     * @return the phone number
     */
    public String getPhoneNumber(){
        return phoneNumber;
    }

    /**
     * Sets the user's phone number
     * 
     * @param phoneNumber
     */
    public void setPhoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber;
    }
}
