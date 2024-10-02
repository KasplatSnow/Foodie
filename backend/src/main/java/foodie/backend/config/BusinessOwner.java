public class BusinessOwner extends User{
    
    public ArrayList<Listing> listings = new ArrayList<Listings>();

    public BusinessOwner(long id, String name, String username, String password, String phoneNumber, String email, String role, ArrayList<Listing> listings){
        super(id, name, username, password, phoneNumber, email, role = "BusinessOwnser");
        this.listings = listings;
    }

    public String addListing(String name, String address, String phoneNumber, String email, int zipCode){
        return "Listing Created";
    }

    public String updateListing(long businessID, String name, String[] photos, String description, String address, String email, String phoneNumber, int zipCode){
        return "Listing Updated";
    }

    public ArrayList<Listing> viewListings(){
        ArrayList<Listing> listings = new ArrayList<Listing>();
        return listings;
    }

    public Listing getListing(long businessID){
        Listing listing = new Listing();
        return listing;
    }
}
