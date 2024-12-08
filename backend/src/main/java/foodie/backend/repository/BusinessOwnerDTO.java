package foodie.backend.repository;

import java.util.List;

public class BusinessOwnerDTO {

    private long userID;
    private String name, address, phoneNumber, email;
    private List<Long> restaurantIDs;

    public BusinessOwnerDTO(long userID, String name, String address, String phoneNumber, String email,List<Long> restaurantIDs) {
        this.userID = userID;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.restaurantIDs = restaurantIDs;
        this.email = email;
    }

    public BusinessOwnerDTO() {
    }

    public long getUserID() {
        return userID;
    }

    public void setUserID(long userID) {
        this.userID = userID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Long> getRestaurantIDs() {
        return restaurantIDs;
    }

    public void setRestaurantIDs(List<Long> restaurantIDs) {
        this.restaurantIDs = restaurantIDs;
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

}
