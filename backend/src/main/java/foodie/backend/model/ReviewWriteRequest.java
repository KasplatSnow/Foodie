package foodie.backend.model;

public class ReviewWriteRequest {
    private User user;
    private Restaurant Restaurant;
    private Float rating;
    private String reviewText;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Restaurant getRestaurant() {
        return Restaurant;
    }

    public void setRestaurant(Restaurant Restaurant) {
        this.Restaurant = Restaurant;
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
