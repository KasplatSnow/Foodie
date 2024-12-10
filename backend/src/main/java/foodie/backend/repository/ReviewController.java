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
    private UserService userService;

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
  @PostMapping("/write")/*UPDATED BAD REQUEST RESPONSES */
  public ResponseEntity<?> writeReview(@RequestBody ReviewWriteRequest writeRequest) {
            //check if restaurant already exists via
        if (!reviewService.getReviewExist(writeRequest.getRestaurantID(), writeRequest.getUserID())) {
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

        Review newReview= new Review(userService.getUserByID(writeRequest.getUserID()),
        restaurantService.getByRestaurantID(writeRequest.getRestaurantID()),
        writeRequest.getReviewText(), writeRequest.getRating());
        
        //save the user to the database
        reviewService.createReview(newReview);

        //return success message
        return ResponseEntity.ok("Review Creation successful");
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
        List<Review> reviews = reviewService.getReviewByRestaurantID(restaurantID);
        return reviews.stream().map(review -> new ReviewDTO(
            review.getReviewID(),
            review.getRestaurant().getRestaurantID(),
            review.getUser().getUserID(),
            review.getReviewText(),
            review.getRating())).collect(Collectors.toList());
    }

    /**
     * Gets all the reviews a certain user has made, using their ID
     * 
     * @param userID
     * @return a list of user reviews
     */
    @GetMapping("/userreviews/userID/{userID}")
    public List<ReviewDTO> getUserReviews(@PathVariable Long userID) {
        List<Review> reviews = reviewService.getReviewByUserID(userID);
        return reviews.stream().map(review -> new ReviewDTO(
            review.getReviewID(),
            review.getRestaurant().getRestaurantID(),
            review.getUser().getUserID(),
            review.getReviewText(),
            review.getRating())).collect(Collectors.toList());    
    }

    /**
     * Creates a shell restaurant and a review using a request. And creates a response.
     * 
     * @param shellRequest
     * @return a response
     */
    @PostMapping("/createshellrestaurant")
    public ResponseEntity<?> createShellRestaurantAndWriteReview(@RequestBody ShellRequest shellRequest ) {
        RestaurantRegistrationRequest shellRestaurant = shellRequest.getRestaurant();
        ReviewWriteRequest writeRequest = shellRequest.getReview();
        restaurantService.createShellRestaurant(shellRestaurant);

        Restaurant newRestaurant = restaurantService.getRestaurantByNameAndAddress(shellRestaurant.getName(), shellRestaurant.getAddress());

        Review newReview= new Review(userService.getUserByID(writeRequest.getUserID()),
        restaurantService.getByRestaurantID(newRestaurant.getRestaurantID()),
        writeRequest.getReviewText(), writeRequest.getRating());

        reviewService.createReview(newReview);

        return ResponseEntity.ok("Created Shell of a Restaurant and Wrote Review");
    }
}
