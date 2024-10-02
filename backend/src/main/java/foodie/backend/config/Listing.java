import java.util.ArrayList;

public class Listing {
    
    public long businessID;
    public String name;
    public String[] photos;
    public String description;
    public String address;
    public String email;
    public String phoneNumber;
    public int zipCode;
    public ArrayList<Review> reviews;
    public BusinessOwner businessOwner;

    public Listing(long businessID, String name, String[] photos, String description, String address, String email, String phoneNumber, int zipCode, ArrayList<Review> reviews, BusinessOwner businessOwner){
        this.businessID = businessID;
        this.name = name;
        this.photos = photos;
        this.description = description;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.zipCode = zipCode;
        this.reviews = reviews;
        this.businessOwner = businessOwner;
    }
    
}
