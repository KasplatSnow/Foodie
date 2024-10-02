import java.util.ArrayList;

public class User{
    
    public long id;
    public String name;
    public String username;
    public String password;
    public String phoneNumber;
    public String email;
    public ArrayList<Review> review = new ArrayList<Review>();
    public String role;

    public User(long id, String name, String username, String password, String phoneNumber, String email, String role){
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.role = role;
    }

    public String createReview(long id, String title, float rating){
        /*
         * 
         */
        return "Review Written";
    }

    public ArrayList<Listing> search(int zipCode){
        ArrayList<Listing> listings = new ArrayList<Listing>();
        return listings;
    }

    public void register(String username, String password, int code){
        /*
         * 
         */
    }

    public void login(String username, String password){
        /*
         * 
         */
    }
}
