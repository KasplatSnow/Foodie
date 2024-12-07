package foodie.backend.model;

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

@Entity
@Table(name = "restaurant")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long restaurantID;

    private String name, address, phoneNumber, email, cuisine, hours, description, photo;
    private String zip_code;
    private int price;
    private float rating;
    private double lng, lat;
    
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Review> reviews;

    @ManyToOne
    @JoinColumn(name = "ownerID", nullable = false)
    private BusinessOwner owner;
    
    public Restaurant(
        String name, 
        BusinessOwner owner,
        String address, 
        String zip_code, 
        String phoneNumber, 
        String email, 
        String cuisine, 
        String hours, 
        String description, 
        float rating, 
        int price
        String photo,
        double lng,
        double lat){
        this.name = name;
        this.owner = owner;
        this.address = address;
        this.zip_code = zip_code;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.cuisine = cuisine;
        this.hours = hours;
        this.description = description;
        this.rating = rating;
        this.price = price;
        this.photo = photo;
        this.lng = lng;
        this.lat = lat;
    }

    public Restaurant(){

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
    
    public void setZipCode(String zip_code) {
        this.zip_code = zip_code;
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
    
    public String getZipCode() {
        return zip_code;
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
    
    public List<Long> getReviewID(){
      return reviews.stream().map(Review::getReviewID).collect(Collectors.toList());
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
}
