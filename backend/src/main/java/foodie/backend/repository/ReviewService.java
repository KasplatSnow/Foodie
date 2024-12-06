package foodie.backend.repository;

import java.util.List;

import foodie.backend.model.Review;
import foodie.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository){
        this.reviewRepository = reviewRepository;
    }
    
    // Create a new user
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    public Review getById(Long reviewId){
        return reviewRepository.findByID(reviewId);
    }

    public List<Review> getReviewByRestaurantID(Long restaurantId){
        return reviewRepository.findAllRestaurantReviews(restaurantId);
    }

    public List<Review> getAllUsers(){
        return reviewRepository.findAll();
    }

    public boolean getReviewExist(Long restaurantID, Long userID){
        return reviewRepository.findReviewExist(restaurantID, userID) == null;
    }
}