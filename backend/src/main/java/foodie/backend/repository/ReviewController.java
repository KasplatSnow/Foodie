package foodie.backend.repository;

import java.util.List;
import java.util.stream.Collectors;

import foodie.backend.repository.Review;
import foodie.backend.repository.ReviewWriteRequest;
import foodie.backend.repository.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for handling API endpoints related to reviews.
 * Provides functionality for creating reviews, getting reviews, and creating a shell restaurant with a review.
 */

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private final ReviewService reviewService;

    @Autowired
    private RestaurantService restaurantService;
    
    /**
     * Constructs the review controller with the review service
     * 
     * @param reviewService
     */
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    /**
     * Creates a review and returns a response, using a request
     * 
     * @param writeRequest
     * @return a response
     */
  @PostMapping("/write")
  public ResponseEntity<?> writeReview(@RequestBody ReviewWriteRequest writeRequest) {
        return reviewService.createReview(writeRequest);
    }

    //retrieves all reviews for a restaurant
    /**
     * Gets all the reviews for a certain restaurant using the restaurant's ID
     * 
     * @param restaurantID
     * @return a list of reviews
     */
  @GetMapping("/allreviews/restaurantID/{restaurantID}") /* UPDATED PATH  AND CREATED REVIEWDTO*/
    public List<ReviewDTO> getReviews(@PathVariable Long restaurantID) {
        return reviewService.getReviewByRestaurantID(restaurantID);

    }

    /**
     * Gets all the reviews a certain user has made, using their ID
     * 
     * @param userID
     * @return a list of user reviews
     */
   @GetMapping("/userreviews/userID/{userID}")
    public List<ReviewDTO> getUserReviews(@RequestParam Long userID) {
        return reviewService.getReviewByUserID(userID);
    }

    /**
     * Creates a shell restaurant and a review using a request. And creates a response.
     * 
     * @param shellRequest
     * @return a response
     */
    @PostMapping("/createshellrestaurant")
    public ResponseEntity<?> createShellRestaurantAndWriteReview(@RequestBody ShellRequest shellRequest) {
        RestaurantRegistrationRequest shellRestaurant = shellRequest.getRestaurant();
        ReviewWriteRequest writeRequest = shellRequest.getReview();

        restaurantService.createShellRestaurant(shellRestaurant);

        reviewService.createReview(writeRequest);

        return ResponseEntity.ok("Created Shell of a Restaurant and Wrote Review");
    }
}
