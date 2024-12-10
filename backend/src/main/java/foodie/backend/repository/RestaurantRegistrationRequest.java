package foodie.backend.repository;

import java.util.List;

/**
 * Class used to create an object that stores restaurant creation information for requests
 */
public class RestaurantRegistrationRequest {

    private String email;
    private String name;
    private String zipCode;
    private String address;
    private String phoneNumber;
    private Long businessOwnerId;
    private String hours;
    private String description;
    private List<String> cuisine;
    private List<String> photo;
    private Float rating;
    private Integer price;
    private double lng;
    private double lat;
    
    /**
     * Gets the email of the restaurant
     * 
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email of the restaurant
     * 
     * @param email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets the name of the restaurant
     * 
     * @return the name
     */
    public String getName(){
        return name;
    }

    /**
     * Sets the name of the restaurant
     * 
     * @param name
     */
    public void setName(String name){
        this.name = name;
    }

    /**
     * Gets the restaurant's zip code
     * 
     * @return the zip code
     */
    public String getZipCode() {
        return zipCode;
    }

    /**
     * Sets the zip code of the restaurant
     * 
     * @param zipCode
     */
    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    /**
     * Gets the restaurant's phone number
     * 
     * @return the phone number
     */
    public String getPhoneNumber(){
        return phoneNumber;
    }

    /**
     * Sets the phone number of the restaurant
     * 
     * @param phoneNumber
     */
    public void setPhoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber;
    }

    /**
     * Gets the restaurant address
     * 
     * @return the address
     */
    public String getAddress() {
        return address;
    }

    /**
     * Sets the address of the restaurant
     * 
     * @param address
     */
    public void setAddess(String address){
        this.address = address;
    }

    /**
     * Gets the ID of the business owner
     * 
     * @return the owner ID
     */
    public Long getBusinessOwnerId() {
        return businessOwnerId;
    }

    /**
     * Sets the ID of the business owner
     * 
     * @param businessOwnerID
     */
    public void setBusinessOwnerId(Long businessOwnerId) {
        this.businessOwnerId = businessOwnerId;
    }

    /**
     * Gets the working hours of the restaurant
     * 
     * @return the hours
     */
    public String getHours() {
        return hours;
    }

    /**
     * Sets the working hours of the restaurant
     * 
     * @param hours
     */
    public void setHours(String hours) {
        this.hours = hours;
    }

    /**
     * Gets the restaurant's description
     * 
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets the description of the resturant to be shown
     * 
     * @param description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Gets the list of cuisines that the restaurant has
     * 
     * @return the list of cuisines
     */
    public List<String> getCuisine() {
        return cuisine;
    }

    /**
     * Sets the cuisine of the restaurant using a list
     * 
     * @param cuisine
     */
    public void setCuisine(List<String> cuisine) {
        this.cuisine = cuisine;
    }

    /**
     * Gets the list of photos associated to the restaurant
     * 
     * @return the list of photos
     */
    public List<String> getPhoto() { return photo; }

    /**
     * Sets the list of photos associated to the restaurant
     * 
     * @param photo
     */
    public void setPhoto(List<String> photo) { this.photo = photo; }

    /**
     * Gets the longitude of the restaurant location
     * 
     * @return the longitude
     */
    public double getLng() { return lng; }

    /**
     * Sets the longitude of the restaurant location
     * 
     * @param lng the longitude
     */
    public void setLng(double lng) { this.lng = lng; }

    /**
     * Gets the latitude of the restaurant location
     * 
     * @return the latitude
     */
    public double getLat() { return lat; }

    /**
     * Sets the latitude of the restaurant's position
     * 
     * @param lat the latitude
     */
    public void setLat(double lat) { this.lat = lat; }
    
    /**
     * Gets the restaurant's rating
     * 
     * @return the rating
     */
    public Float getRating() {
        return this.rating;
    }

    /**
     * Sets the rating of the restaurant
     * 
     * @param rating
     */
    public void setRating(Float rating) {
        this.rating = rating;
    }

    /**
     * Gets the price of the restaurant
     * 
     * @return the price
     */
    public Integer getPrice() {
        return price;
    }

    /**
     * Sets the price point of the restaurant
     * 
     * @param price
     */
    public void setPrice(Integer price) {
        this.price = price;
    }
}
