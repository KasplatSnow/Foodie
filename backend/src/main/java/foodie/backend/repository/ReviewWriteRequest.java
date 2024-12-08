package foodie.backend.repository;

public class ReviewWriteRequest {
    private Long userID;
    private Long restaurantID;
    private Float rating;
    private String reviewText;

    public Long getUserID() {
        return userID;
    }

    public void setUser(Long userID) {
        this.userID = userID;
    }

    public Long getRestaurantID() {
        return restaurantID;
    }

    public void setRestaurantID(Long restaurantID) {
        this.restaurantID = restaurantID;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }
}
