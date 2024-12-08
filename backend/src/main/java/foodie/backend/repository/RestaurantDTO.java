package foodie.backend.controller;
import java.util.List;

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

    public long getRestaurantID() {
        return restaurantID;
    }

    public void setRestaurantID(long restaurantID) {
        this.restaurantID = restaurantID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
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

    public List<String> getCuisine() {
        return cuisine;
    }

    public void setCuisine(List<String> cuisine) {
        this.cuisine = cuisine;
    }

    public String getHours() {
        return hours;
    }

    public void setHours(String hours) {
        this.hours = hours;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public long getOwnerID() {
        return ownerID;
    }

    public void setOwnerID(long ownerID) {
        this.ownerID = ownerID;
    }

    public List<Long> getReviewID() {
        return reviewID;
    }

    public void setReviewID(List<Long> reviewID) {
        this.reviewID = reviewID;
    }
        public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
    
    public List<String> getPhoto() {
        return photo;
    }

    public void setPhoto(List<String> photo) {
        this.photo = photo;
    }
}
