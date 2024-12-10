package foodie.backend.repository;

/**
 * Data Transfer Object (DTO) for review information.
 * This class is used to transfer information such as the review ID between layers.
 */
public class ReviewDTO {
    private Long reviewID, restaurantID, userID;
    private String review_text;
    private float rating;

    /**
     * Constructs a ReviewDTO object with the necessary info for a review
     * 
     * @param reviewID
     * @param restaurantID
     * @param userID
     * @param review_text
     * @param rating
     */
    public ReviewDTO(Long reviewID, Long restaurantID, Long userID, String review_text, float rating){
        this.reviewID = reviewID;
        this.restaurantID = restaurantID;
        this.userID = userID;
        this.review_text = review_text;
        this.rating = rating;
    }

    /**
     * Default constructor
     */
    public ReviewDTO(){

    }

    /**
     * Gets the review ID
     * 
     * @return the review ID
     */
    public Long getReviewID(){
        return reviewID;
    }

    /**
     * Sets the review ID
     * 
     * @param reviewID
     * @return the review ID
     */
    public Long setReviewID(Long reviewID){
        return this.reviewID = reviewID;
    }

    /**
     * Gets the restaurant ID associated with the review
     * 
     * @return the restaurant ID
     */
    public Long getRestaurantID() {
        return restaurantID;
    }

    /**
     * Sets the restaurant ID associated with the review
     * 
     * @param restaurantID
     */
    public void setRestaurantID(Long restaurantID) {
        this.restaurantID = restaurantID;
    }

    /**
     * Gets the user ID associated with the review
     * 
     * @return the userID
     */
    public Long getUserID() {
        return userID;
    }

    /**
     * Sets the user ID of the review
     * 
     * @param userID
     */
    public void setUserID(Long userID) {
        this.userID = userID;
    }

    /**
     * Get the text of the review
     * 
     * @return the review text
     */
    public String getReview_text() {
        return review_text;
    }

    /**
     * Sets the text of the review
     * 
     * @param review_text
     */
    public void setReview_text(String review_text) {
        this.review_text = review_text;
    }

    /**
     * Gets the rating of the review
     * 
     * @return the rating(1-5)
     */
    public float getRating() {
        return rating;
    }

    /**
     * Sets the rating of the review
     * 
     * @param rating (1-5)
     */
    public void setRating(float rating) {
        this.rating = rating;
    }


}
