package foodie.backend.repository;
import java.util.List;

/**
 * Data Transfer Object (DTO) for user information.
 * This class is used to transfer information such as the user ID between layers.
 */
public class UserDTO {

    private Long userID;
    private String username, address, phoneNumber, email, password, role, pfp;
    private List<Long> reviewID;

    /**
     * Constructs a UserDTO with the info necessary to create a User
     * 
     * @param userID
     * @param username
     * @param role
     * @param password
     * @param email
     * @param address
     * @param phoneNumber
     * @param reviewID
     * @param pfp
     */
    public UserDTO(Long userID, String username, String role, String password, 
                   String email, String address, String phoneNumber, List<Long> reviewID, String pfp) {
        this.userID = userID;
        this.username = username;
        this.role = role;
        this.password = password;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.reviewID = reviewID;
        this.pfp = pfp;
    }

    /**
     * Default Constructor
     * 
     */
    public UserDTO() {
    }

    /**
     * Gets the user ID
     * 
     * @return user ID
     */
    public Long getUserID() {
        return userID;
    }

    /**
     * Sets the user ID
     * 
     * @param userID
     */
    public void setUserID(Long userID) {
        this.userID = userID;
    }

    /**
     * Gets the username of the user
     * 
     * @return the username string
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username of the user
     * 
     * @param username
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Gets the address of the user
     * 
     * @return the address
     */
    public String getAddress() {
        return address;
    }

    /**
     * Sets the address of the user
     * 
     * @param address
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * Gets the phone number of the user
     * 
     * @return the phone number
     */
    public String getPhoneNumber() {
        return phoneNumber;
    }

    /**
     * Sets the user's phone number
     * 
     * @param phoneNumber
     */
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

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
     * Gets the list of reviewIDs for the reviews the user has made
     * 
     * @return list of reviewIDs
     */
    public List<Long> getReviewID() {
        return reviewID;
    }

    /**
     * Sets the list of reviewIDs for the reviews the user has made
     * 
     * @param reviewID
     */
    public void setReviewID(List<Long> reviewID) {
        this.reviewID = reviewID;
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
     * Gets the profile picture string of the user
     * 
     * @return the profile picture string
     */
    public String getPfp() {
        return pfp;
    }

    /**
     * Sets the profile picture string
     * 
     * @param pfp
     */
    public void setPfp(String pfp) {
        this.pfp = pfp;
    }
}
