package foodie.backend.controller;
import java.util.List;

public class UserDTO {

    private Long userID;
    private String username, address, phoneNumber, email, password, role;
    private List<Long> reviewID;

    public UserDTO(Long userID, String username, String role, String password, String email, String address, String phoneNumber, List<Long> reviewID) {
        this.userID = userID;
        this.username = username;
        this.role = role;
        this.password = password;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.reviewID = reviewID;
    }

    public UserDTO() {
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Long> getReviewID() {
        return reviewID;
    }

    public void setReviewID(List<Long> reviewID) {
        this.reviewID = reviewID;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
