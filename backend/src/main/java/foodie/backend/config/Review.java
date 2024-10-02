
public class Review {
    public float rating;
    public String text;
    public String title;
    public User user;
    public Listing listing;

    public Review(float rating, String text, String title, User user, Listing listing){
        this.rating = rating;
        this.text = text;
        this.title = title;
        this.user = user;
        this.listing = listing;
    }

    public void setRating(float change){
        rating = change;
    }
    
    public void setText(String change){
        text = change;
    }

    public voiud setTitle(String change){
        title = change;
    }

    public void setUserID(long change){
        userID = change;
    }

    public float getRating(){
        return rating;
    }

    public String getText(){
        return text;
    }

    public String getTitle(){
        return title;
    }

    public getUserID(){
        return userID;
    }
}
