
import java.util.List;

public class Restaurant {
    private String name, address, phoneNumber, email, cuisine, hours, description;
    private int zipCode, price;
    private float rating;
    private long restaurantID;
    public List<Review> reviews;
    private BusinessOwner owner;
    //List<> photos;
    
    public Restaurant(
        long restaurantID,
        String name, 
        BusinessOwner owner,
        String address, 
        int zipCode, 
        String phoneNumber, 
        String email, 
        String cuisine, 
        String hours, 
        String description, 
        float rating, 
        int price){
        this.restaurantID = restaurantID;
        this.name = name;
        this.owner = owner;
        this.address = address;
        this.zipCode = zipCode;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.cuisine = cuisine;
        this.hours = hours;
        this.description = description;
        this.rating = rating;
        this.price = price;
    }

    // Add a photo to the restaurant
    public void addPhoto(String photoUrl) {
        //this.photos.add(photoUrl);
    }

    public void writeReview(User user, Restaurant restaurant, String text, float rating){
        Review review = new Review(user, restaurant, text, rating);
    }
    // Update the contact info and hours
    public void updateDetails(
        String phoneNumber,
        String hours,
        String description,
        int zipCode
    ) {
        this.phoneNumber = phoneNumber;
        this.hours = hours;
        this.description = description;
        this.zipCode = zipCode;
    }

    public void setRestaurantID(int restaurantID) {
        this.restaurantID = restaurantID;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBusinessOwner(BusinessOwner owner){
        this.owner = owner;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setZipCode(int zipCode) {
        this.zipCode = zipCode;
    }

    public void setPhoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public void setHours(String hours) {
        this.hours = hours;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public long getRestaurantID(){
        return restaurantID;
    }
    
    public String getName() {
        return name;
    }

    public BusinessOwner getBusinessOwner(){
        return owner;
    }

    public long getOwnerID(){
        return owner.getUserID();
    }

    public String getAddress() {
        return address;
    }

    public int getZipCode() {
        return zipCode;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public String getCuisine() {
        return cuisine;
    }

    public String getHours() {
        return hours;
    }

    public String getDescription() {
        return description;
    }

    public float getRating() {
        return rating;
    }

    public int getPrice() {
        return price;
    }

    public List<Review> getReviews() {
        return reviews;
    }


}
