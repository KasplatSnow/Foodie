package foodie.backend.repository;

import java.util.List;

import foodie.backend.repository.Review;
import foodie.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class that provides a Review creation method for the db.
 * Also retrieves list of reviews, and users.
 */

@Service
public class ReviewService {

    @Autowired
    private final ReviewRepository reviewRepository;

    /**
     * Constructs the review service object using the review repository
     * 
     * @param reviewRepository
     */
    public ReviewService(ReviewRepository reviewRepository){
        this.reviewRepository = reviewRepository;
    }
    
    // Create a new user
    /**
     * Creates a review in the db using a Review object
     * 
     * @param review
     * @return a Review object
     */
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    /**
     * Finds a certain review by ID
     * 
     * @param reviewId
     * @return a Review object
     */
    public Review getById(Long reviewId){
        return reviewRepository.findByID(reviewId);
    }

    /**
     * Gets list of reviews for a certain restaurant
     * 
     * @param restaurantId
     * @return a review list
     */
    public List<Review> getReviewByRestaurantID(Long restaurantId){
        return reviewRepository.findAllRestaurantReviews(restaurantId);
    }

    /**
     * Gets all reviews by all users
     * 
     * @return a list of reviews
     */
    public List<Review> getAllUsers(){
        return reviewRepository.findAll();
    }

    /**
     * Checks if a review exists by restaurant ID and user ID
     * 
     * @param restaurantID
     * @param userID
     * @return boolean if exists
     */
    public boolean getReviewExist(Long restaurantID, Long userID){
        return reviewRepository.findReviewExist(restaurantID, userID) == null;
    }
        
    /**
     * Gets all reviews a user has done, by searching for user ID
     * 
     * @param userID
     * @return a review list
     */
    public List<Review> getReviewByUserID(Long userID){
        return reviewRepository.findReviewByUserID(userID);
    }
}
