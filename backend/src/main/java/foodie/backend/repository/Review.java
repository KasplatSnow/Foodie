package foodie.backend.repository;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Creates a table in the db for "Reviews" alongside the details such as viewtext and rating
 * Creates a many to one association with users and restaurants.
 * Includes methods for construction, getters, and setters
 * 
 */

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

    private String review_text;
    private float rating; // 1-5 stars

    /**
     * Constructor for reviews 
     * 
     * @param user
     * @param restaurant
     * @param review_text
     * @param rating
     */
    public Review(User user, Restaurant restaurant, String review_text, float rating){
        this.user = user;
        this.restaurant = restaurant;
        this.review_text = review_text;
        this.rating = rating;
    }

    /**
     * Default constructor
     */
    public Review(){
        
    }

    /**
     * Sets the review text of the review
     * 
     * @param review_text
     */
    public void setReviewText(String review_text){
        this.review_text = review_text;
    }

    /**
     * Sets the rating of the review
     * 
     * @param rating
     */
    public void setRating(float rating){
        this.rating = rating;
    }

    /**
     * Gets the review text of the review
     * 
     * @return the review text
     */
    public String getReviewText() {
        return review_text;
    }

    /**
     * Gets the rating of the review
     * 
     * @return the rating
     */
    public float getRating() {
        return rating;
    }

    /**
     * Gets the restaurant associated with the review
     * 
     * @return the restaurant associated
     */
    public Restaurant getRestaurant(){
        return restaurant;
    }
    
    /**
     * Gets the user who owns the review
     * 
     * @return the user
     */
    public User getUser(){
        return user;
    }

    /**
     * Gets the ID of the review
     * 
     * @return the review ID
     */
    public Long getReviewID(){
        return reviewID;
    }
}
