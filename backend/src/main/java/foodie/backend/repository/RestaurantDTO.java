package foodie.backend.repository;
import java.util.List;

/**
 * Data Transfer Object (DTO) for restaurant information.
 * This class is used to transfer information such as the restaurant ID between layers.
 */
public class RestaurantDTO {

    private long restaurantID;
    private String name;
    private String address;
    private String zipCode;
    private String phoneNumber;
    private String email;
    private List<String> cuisine;
    private String hours;
    private String description;
    private float rating;
    private int price;
    private long ownerID;
    private List<String> photo;
    private double lng;
    private double lat;
    private List<Long> reviewID;
    
    /**
     * Constructs a restaurantDTO object using the parameters 
     * 
     * @param restaurantID
     * @param name
     * @param address
     * @param zipCode
     * @param phoneNumber
     * @param email
     * @param cuisine
     * @param hours
     * @param description
     * @param rating
     * @param price
     * @param ownerID
     * @param photo
     * @param lng
     * @param lat
     * @param reviewID
     */
    public RestaurantDTO(long restaurantID, String name, String address, String zipCode, 
                         String phoneNumber, String email, List<String> cuisine, String hours, 
                         String description, float rating, int price, long ownerID, List<String> photo, double lng, double lat, List<Long> reviewID) {
        this.restaurantID = restaurantID;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.hours = hours;
        this.description = description;
        this.rating = rating;
        this.zipCode = zipCode;
        this.price = price;
        this.cuisine = cuisine;
        this.email = email;
        this.ownerID = ownerID;
        this.photo = photo;
        this.lng = lng;
        this.lat = lat;
        this.reviewID = reviewID;
    }

    /**
     * Gets the ID of the restaurant
     * 
     * @return the ID
     */
    public long getRestaurantID() {
        return restaurantID;
    }

    /**
     * Sets the ID of the restaurant
     * 
     * @param restaurantID
     */
    public void setRestaurantID(long restaurantID) {
        this.restaurantID = restaurantID;
    }

    /**
     * Gets the name of the restaurant
     * 
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the restaurant
     * 
     * @param name
     */
    public void setName(String name) {
        this.name = name;
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
    public void setAddress(String address) {
        this.address = address;
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
    public String getPhoneNumber() {
        return phoneNumber;
    }

    /**
     * Sets the phone number of the restaurant
     * 
     * @param phoneNumber
     */
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

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
     * Gets the restaurant's rating
     * 
     * @return the rating
     */
    public float getRating() {
        return rating;
    }

    /**
     * Sets the rating of the restaurant
     * 
     * @param rating
     */
    public void setRating(float rating) {
        this.rating = rating;
    }

    /**
     * Gets the price of the restaurant
     * 
     * @return the price
     */
    public int getPrice() {
        return price;
    }

    /**
     * Sets the price point of the restaurant
     * 
     * @param price
     */
    public void setPrice(int price) {
        this.price = price;
    }

    /**
     * Gets the ID of the business owner
     * 
     * @return the owner ID
     */
    public long getOwnerID() {
        return ownerID;
    }

    /**
     * Sets the ID of the business owner
     * 
     * @param ownerID
     */
    public void setOwnerID(long ownerID) {
        this.ownerID = ownerID;
    }

    /**
     * Gets the list of IDs of associated reviews
     * 
     * @return list of associated review IDs
     */
    public List<Long> getReviewID() {
        return reviewID;
    }

    /**
     * Sets the list of review IDs associated to the restaurant
     * 
     * @param reviewID
     */
    public void setReviewID(List<Long> reviewID) {
        this.reviewID = reviewID;
    }

    /**
     * Gets the longitude of the restaurant location
     * 
     * @return the longitude
     */
    public double getLng() {
        return lng;
    }

    /**
     * Sets the longitude of the restaurant location
     * 
     * @param lng the longitude
     */
    public void setLng(double lng) {
        this.lng = lng;
    }

    /**
     * Gets the latitude of the restaurant location
     * 
     * @return the latitude
     */
    public double getLat() {
        return lat;
    }

    /**
     * Sets the latitude of the restaurant's position
     * 
     * @param lat the latitude
     */
    public void setLat(double lat) {
        this.lat = lat;
    }
    
    /**
     * Gets the list of photos associated to the restaurant
     * 
     * @return the list of photos
     */
    public List<String> getPhoto() {
        return photo;
    }

    /**
     * Sets the list of photos associated to the restaurant
     * 
     * @param photo
     */
    public void setPhoto(List<String> photo) {
        this.photo = photo;
    }
}

