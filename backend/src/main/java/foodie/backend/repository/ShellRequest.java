package foodie.backend.repository;

/**
 * Class used to create an object that stores shell restaurant creation information for requests
 */
public class ShellRequest {
    private RestaurantRegistrationRequest restaurant;
    private ReviewWriteRequest review;

    /**
     * Gets a shell restaurant creation request
     * 
     * @return the shell restaurant creation request
     */
    public RestaurantRegistrationRequest getRestaurant() {
        return restaurant;
    }

    /**
     * Sets the shell restaurant
     * 
     * @param restaurant
     */
    public void setRestaurant(RestaurantRegistrationRequest restaurant) {
        this.restaurant = restaurant;
    }

    /**
     * Sets the review of the shell restaurant
     * 
     * @param review
     */
    public void setReview(ReviewWriteRequest review) {
        this.review = review;
    }

    /**
     * Gets the review creation request of the shell restaurant
     * 
     * @return the review creation request
     */
    public ReviewWriteRequest getReview() {
        return review;
    }

}
