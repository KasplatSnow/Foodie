package foodie.backend.repository;

import java.util.List;

/**
 * Data Transfer Object (DTO) for business owner information.
 * This class is used to transfer user ID and other details like owned restaurants between layers.
 */
public class BusinessOwnerDTO {

    private long userID;
    private String name, address, phoneNumber, email;
    private List<Long> restaurantIDs;

   /**
    * Constructor for creating a new instance of BusinessOwnerDTO with specific information.
    * 
    * @param userID the unique identifier of the business owner
    * @param name the name of the business owner
    * @param address the real-life address of the business owner
    * @param phoneNumber the phone number 
    * @param email the email address of the business owner
    * @param restaurantIDs a list of restaurant IDs owned by the business owner
    */
    public BusinessOwnerDTO(long userID, String name, String address, String phoneNumber, String email,List<Long> restaurantIDs) {
        this.userID = userID;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.restaurantIDs = restaurantIDs;
        this.email = email;
    }

    /**
     * Default constructor
     */
    public BusinessOwnerDTO() {
    }

    /**
     * Getter for the user ID associated with the BusinessOwnerDTO.
     *
     * @return the user ID
     */
    public long getUserID() {
        return userID;
    }

    /**
     * Setter for the user ID associated with the BusinessOwnerDTO.
     *
     * @param userID the user ID
     */
    public void setUserID(long userID) {
        this.userID = userID;
    }

    /**
     * Getter for name associated with the BusinessOwnerDTO.
     *
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * Setter for name associated with the BusinessOwnerDTO.
     *
     * @param name the name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Getter for restaurants associated with the BusinessOwnerDTO.
     *
     * @return the restaurantIDs
     */
    public List<Long> getRestaurantIDs() {
        return restaurantIDs;
    }

    /**
     * Setter for restaurants associated with the BusinessOwnerDTO.
     *
     * @param restaurantIDs the restaurant names
     */
    public void setRestaurantIDs(List<Long> restaurantIDs) {
        this.restaurantIDs = restaurantIDs;
    }

    /**
     * Getter for the address associated with the BusinessOwnerDTO.
     *
     * @return the address
     */
    public String getAddress() {
        return address;
    }

    /**
     * Setter for the address associated with the BusinessOwnerDTO.
     *
     * @param address the address
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * Getter for the phone number associated with the BusinessOwnerDTO.
     *
     * @return the phone number
     */
    public String getPhoneNumber() {
        return phoneNumber;
    }

    /**
     * Setter for the phone number associated with the BusinessOwnerDTO.
     *
     * @param phoneNumber the phone number
     */
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    /**
     * Getter for the email associated with the BusinessOwnerDTO.
     *
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * Setter for the email associated with the BusinessOwnerDTO.
     *
     * @param email the email
     */
    public void setEmail(String email) {
        this.email = email;
    }

}
