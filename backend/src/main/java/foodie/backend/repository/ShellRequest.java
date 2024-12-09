package com.example;

public class ShellRequest {
    private RestaurantRegistrationRequest restaurant;
    private ReviewWriteRequest review;

    public RestaurantRegistrationRequest getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(RestaurantRegistrationRequest restaurant) {
        this.restaurant = restaurant;
    }

    public void setReview(ReviewWriteRequest review) {
        this.review = review;
    }

    public ReviewWriteRequest getReview() {
        return review;
    }

}
