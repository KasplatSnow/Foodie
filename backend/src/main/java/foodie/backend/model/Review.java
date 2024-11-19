public class Review {
    private User user;
    private Restaurant restaurant;
    private String reviewText;
    private float rating; // 1-5 stars

    public Review(User user, Restaurant restaurant, String reviewText, float rating){
        this.user = user;
        this.restaurant = restaurant;
        this.reviewText = reviewText;
        this.rating = rating;
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
}
