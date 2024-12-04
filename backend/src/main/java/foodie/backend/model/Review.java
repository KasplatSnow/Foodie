package foodie.backend.model;

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
    private User user;

    @ManyToOne
    @JoinColumn(name = "restaurantID")
    private Restaurant restaurant;

    private String reviewText;
    private float rating; // 1-5 stars

    public Review(User user, Restaurant restaurant, String reviewText, float rating){
        this.user = user;
        this.restaurant = restaurant;
        this.reviewText = reviewText;
        this.rating = rating;
    }

    public Review(){
        
    }
    public void setReviewText(String reviewText){
        this.reviewText = reviewText;
    }

    public void setRating(float rating){
        this.rating = rating;
    }

    public String getReviewText() {
        return reviewText;
    }

    public float getRating() {
        return rating;
    }

    public Restaurant getRestaurant(){
        return restaurant;
    }

    public User getUser(){
        return user;
    }
    
    public Long getReviewID(){
        return reviewID;
    }
}
