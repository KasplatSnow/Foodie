package foodie.backend.repository;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**
 * Creates a table in the db for "Restaurants" alongside the details such as name, address, phone number,
 * email, hours, description, zip code, price, rating, longitude, and latitude.
 * Also creates one-to-many associations with cuisine, photo, and reviews.
 * Creates a many to one association with business owners.
 * Includes methods for construction, getters, and setters
 * 
 */

@Entity
@Table(name = "restaurant")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long restaurantID;

    private String name, address, phoneNumber, email, hours, description;
    private String zip_code;
    private Integer price;
    private Float rating;
    private Double lng, lat;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Cuisine> cuisine;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Photo> photo;
    
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Review> reviews;

    @ManyToOne
    @JoinColumn(name = "ownerID", nullable = false)
    private BusinessOwner owner;
    
    /**
     * Constructs a restaurant object using the paramters for name, owner, address, zip code, phone number,
     * email, hours, description, rating, price, longitude, and latitude
     * 
     * @param name
     * @param owner
     * @param address
     * @param zip_code
     * @param phoneNumber
     * @param email
     * @param hours
     * @param description
     * @param rating
     * @param price
     * @param lng
     * @param lat
     */
    public Restaurant(
        String name, 
        BusinessOwner owner,
        String address, 
        String zip_code, 
        String phoneNumber, 
        String email,
        String hours, 
        String description, 
        Float rating,
        Integer price,
        Double lng,
        Double lat){
        this.name = name;
        this.owner = owner;
        this.address = address;
        this.zip_code = zip_code;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.hours = hours;
        this.description = description;
        this.rating = rating;
        this.price = price;
        this.lng = lng;
        this.lat = lat;
    }

    /**
     * Default constructor
     */
    public Restaurant(){

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
     * Sets the name of the restaurant
     * 
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }
    
    /**
     * Sets the owner of the restaurant
     * 
     * @param owner
     */
    public void setBusinessOwner(BusinessOwner owner){
        this.owner = owner;
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
     * Sets the zip code of the restaurant
     * 
     * @param zip_code
     */
    public void setZipCode(String zip_code) {
        this.zip_code = zip_code;
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
     * Sets the email of the restaurant
     * 
     * @param email
     */
    public void setEmail(String email) {
        this.email = email;
    }
    
    /**
     * Sets the cuisine of the restaurant using a list
     * 
     * @param cuisine
     */
    public void setCuisine(List<Cuisine> cuisine) {
        this.cuisine = cuisine;
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
     * Sets the description of the resturant to be shown
     * 
     * @param description
     */
    public void setDescription(String description) {
        this.description = description;
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
     * Sets the price point of the restaurant
     * 
     * @param price
     */
    public void setPrice(Integer price) {
        this.price = price;
    }
    
    /**
     * Gets the ID of the restaurant
     * 
     * @return the ID
     */
    public Long getRestaurantID(){
        return restaurantID;
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
     * Gets the business owner of the restaurant
     * 
     * @return the owner
     */
    public BusinessOwner getBusinessOwner(){
        return owner;
    }
    
    /**
     * Gets the ID of the business owner
     * 
     * @return the owner ID
     */
    public Long getOwnerID(){
        return owner.getUserID();
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
     * Gets the restaurant's zip code
     * 
     * @return the zip code
     */
    public String getZipCode() {
        return zip_code;
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
     * Gets the email of the restaurant
     * 
     * @return the email
     */
    public String getEmail() {
        return email;
    }
    
    /**
     * Gets the list of cuisines that the restaurant has
     * 
     * @return the list of cuisines
     */
    public List<Cuisine> getCuisine() {
        return cuisine;
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
     * Gets the restaurant's description
     * 
     * @return the description
     */
    public String getDescription() {
        return description;
    }
    
    /**
     * Gets the restaurant's rating
     * 
     * @return the rating
     */
    public Float getRating() {
        return rating;
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
     * Gets the list of review IDs associated to the restaurant
     * 
     * @return the list of review IDs
     */
    public List<Long> getReviewID(){
      return reviews.stream().map(Review::getReviewID).collect(Collectors.toList());
    }
    
    /**
     * Gets the longitude of the restaurant location
     * 
     * @return the longitude
     */
    public Double getLng() {
        return lng;
    }

    /**
     * Sets the longitude of the restaurant location
     * 
     * @param lng the longitude
     */
    public void setLng(Double lng) {
        this.lng = lng;
    }

    /**
     * Gets the latitude of the restaurant location
     * 
     * @return the latitude
     */
    public Double getLat() {
        return lat;
    }

    /**
     * Sets the latitude of the restaurant's position
     * 
     * @param lat the latitude
     */
    public void setLat(Double lat) {
        this.lat = lat;
    }

    /**
     * Gets the list of photos associated to the restaurant
     * 
     * @return the list of photos
     */
    public List<Photo> getPhoto() {
        return photo;
    }

    /**
     * Sets the list of photos associated to the restaurant
     * 
     * @param photo
     */
    public void setPhoto(List<Photo> photo) {
        this.photo = photo;
    }
}
