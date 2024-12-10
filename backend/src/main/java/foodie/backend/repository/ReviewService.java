package foodie.backend.repository;

import java.util.List;
import java.util.stream.Collectors;

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

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private UserRepository userRepository;
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
    public ResponseEntity<?> createReview(ReviewWriteRequest writeRequest) {
            //check if restaurant already exists via
        if (getReviewExist(writeRequest.getRestaurantID(), writeRequest.getUserID())) {
            return ResponseEntity.badRequest().body("User wrote review already");
        }
    
        //verify request
        if (writeRequest.getRating() == null) {
            return ResponseEntity.badRequest().body("Rating is required");
        }
        if (writeRequest.getReviewText() == null || writeRequest.getReviewText().isEmpty()) {
            return ResponseEntity.badRequest().body("Review is required");
        }
        if (writeRequest.getRestaurantID() == null) {
            return ResponseEntity.badRequest().body("RestaurantID is required");
        }
        if (writeRequest.getUserID() == null) {
            return ResponseEntity.badRequest().body("UserID is required");
        }

        Review newReview= new Review(userRepository.findByID(writeRequest.getUserID()),
        restaurantRepository.findByRestaurantID(writeRequest.getRestaurantID()),
        writeRequest.getReviewText(), writeRequest.getRating());

        reviewRepository.save(newReview);

        return ResponseEntity.ok("Wrote Review");
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
    public List<ReviewDTO> getReviewByRestaurantID(Long restaurantId){
        List<Review> reviews = reviewRepository.findAllRestaurantReviews(restaurantId);
        return reviews.stream().map(review -> new ReviewDTO(
            review.getReviewID(),
            review.getRestaurant().getRestaurantID(),
            review.getUser().getUserID(),
            review.getReviewText(),
            review.getRating())).collect(Collectors.toList());
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
    public List<ReviewDTO> getReviewByUserID(Long userID){
        List<Review> reviews = reviewRepository.findReviewByUserID(userID);
        return reviews.stream().map(review -> new ReviewDTO(
            review.getReviewID(),
            review.getRestaurant().getRestaurantID(),
            review.getUser().getUserID(),
            review.getReviewText(),
            review.getRating())).collect(Collectors.toList());
    }
}
