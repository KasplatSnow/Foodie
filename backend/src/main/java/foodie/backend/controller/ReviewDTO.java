package com.example;

public class ReviewDTO {
    private Long reviewID, restaurantID, userID;
    private String review_text;
    private float rating;

    public ReviewDTO(Long reviewID, Long restaurantID, Long userID, String review_text, float rating){
        this.reviewID = reviewID;
        this.restaurantID = restaurantID;
        this.userID = userID;
        this.review_text = review_text;
        this.rating = rating;
    }

    public ReviewDTO(){

    }

    public Long getReviewID(){
        return reviewID;
    }

    public Long setReviewID(Long reviewID){
        return this.reviewID = reviewID;
    }

    public Long getRestaurantID() {
        return restaurantID;
    }

    public void setRestaurantID(Long restaurantID) {
        this.restaurantID = restaurantID;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getReview_text() {
        return review_text;
    }

    public void setReview_text(String review_text) {
        this.review_text = review_text;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }


}
