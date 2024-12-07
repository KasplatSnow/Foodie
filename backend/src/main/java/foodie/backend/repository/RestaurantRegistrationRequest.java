package foodie.backend.repository;

public class RestaurantRegistrationRequest {

    private String email;
    private String name;
    private String zipCode;
    private String address;
    private String phoneNumber;
    private Long businessOwnerId;
    private String hours;
    private String description;
    private String cuisine;
    private String photo;
    private double lng;
    private double lat;
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }


    public String getPhoneNumber(){
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddess(String address){
        this.address = address;
    }

    public Long getBusinessOwnerId() {
        return businessOwnerId;
    }

    public void setBusinessOwnerId(Long businessOwnerId) {
        this.businessOwnerId = businessOwnerId;
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

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public String getPhoto() { return photo; }

    public void setPhoto(String photo) { this.photo = photo; }

    public double getLng() { return lng; }

    public void setLng(double lng) { this.lng = lng; }

    public double getLat() { return lat; }

    public void setLat(double lat) { this.lat = lat; }

}
