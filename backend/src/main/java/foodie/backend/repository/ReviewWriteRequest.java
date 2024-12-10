package foodie.backend.repository;

/**
 * Class used to create an object that stores review creation information for requests
 */
public class ReviewWriteRequest {
    private Long userID;
    private Long restaurantID;
    private Float rating;
    private String reviewText;

    /**
     * Gets the user ID associated
     * 
     * @return the user ID
     * 
     */
    public Long getUserID() {
        return userID;
    }

    /**
     * Sets the user by user ID
     * 
     * @param userID
     */
    public void setUser(Long userID) {
        this.userID = userID;
    }

    /**
     * Gets the restaurant ID associated
     * 
     * @return the restaurant ID
     */
    public Long getRestaurantID() {
        return restaurantID;
    }

    /**
     * Sets the restaurant ID
     * 
     * @param restaurantID
     */
    public void setRestaurantID(Long restaurantID) {
        this.restaurantID = restaurantID;
    }

    /**
     * Gets the rating of the review
     * 
     * @return the rating
     */
    public Float getRating() {
        return rating;
    }

    /**
     * Sets the rating of the review
     * 
     * @param rating
     */
    public void setRating(Float rating) {
        this.rating = rating;
    }

    /**
     * Gets the text of the review
     * 
     * @return the review text
     */
    public String getReviewText() {
        return reviewText;
    }

    /**
     * Sets the text of the review
     * 
     * @param reviewText
     */
    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }
}
