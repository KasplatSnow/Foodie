package foodie.backend.repository;

/**
 * Class used to create an object that stores login information for requests
 */
public class LoginRequest {
    private String email;
    private String password;
    private String role;

    // Getters and Setters
    /**
     * Gets the email from the object
     * 
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email in the object
     * 
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets the password from the object
     * 
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password in the object
     * 
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Gets the role from the object
     * 
     * @return the role
     */
    public String getRole() {
        return role;
    }

    /**
     * Sets the role value in the object
     * 
     * @param role the role to set
     */
    public void setRole(String role) {
        this.role = role;
    }
}
