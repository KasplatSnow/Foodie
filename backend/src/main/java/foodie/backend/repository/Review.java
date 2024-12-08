package foodie.backend.repository;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewID;

    @ManyToOne
    @JoinColumn(name = "userID")
    private Long userID;

    @ManyToOne
    @JoinColumn(name = "restaurantID")
    private Long restaurantID;

    private String review_text;
    private float rating; // 1-5 stars

    public Review(Long userID, Long restaurantID, String review_text, float rating){
        this.userID = userID;
        this.restaurantID = restaurantID;
        this.review_text = review_text;
        this.rating = rating;
    }

    public Review(){
        
    }
    public void setReviewText(String review_text){
        this.review_text = review_text;
    }

    public void setRating(float rating){
        this.rating = rating;
    }

    public String getReviewText() {
        return review_text;
    }

    public float getRating() {
        return rating;
    }

    public Long getRestaurantID(){
        return restaurantID;
    }
    
    public Long getUserID(){
        return userID;
    }

    public Long getReviewID(){
        return reviewID;
    }
}
