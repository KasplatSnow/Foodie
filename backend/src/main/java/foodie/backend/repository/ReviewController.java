package foodie.backend.repository;

import java.util.List;
import java.util.stream.Collectors;

import foodie.backend.repository.Review;
import foodie.backend.repository.ReviewWriteRequest;
import foodie.backend.repository.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

  @PostMapping("/write")/*UPDATED BAD REQUEST RESPONSES */
  public ResponseEntity<?> writeReview(@RequestBody ReviewWriteRequest writeRequest) {
            //check if restaurant already exists via
        if (reviewService.getReviewExist(writeRequest.getRestaurantID(), writeRequest.getUserID())) {
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

        Review newReview= new Review(writeRequest.getUserID(), writeRequest.getRestaurantID(), writeRequest.getReviewText(), writeRequest.getRating());
        
        //save the user to the database
        reviewService.createReview(newReview);

        //return success message
        return ResponseEntity.ok("Review Creation successful");
    }

    //retrieves all reviews for a restaurant
    @GetMapping("/allreviews/restaurantID/{restaurantID}") /* UPDATED PATH  AND CREATED REVIEWDTO*/
    public List<ReviewDTO> getReviews(@PathVariable Long restaurantID) {
        List<Review> reviews = reviewService.getReviewByRestaurantID(restaurantID);
        return reviews.stream().map(review -> new ReviewDTO(
            review.getReviewID(),
            review.getRestaurantID(),
            review.getUserID(),
            review.getReviewText(),
            review.getRating())).collect(Collectors.toList());
    }

    @GetMapping("/userreviews/userID/{userID}")
    public List<ReviewDTO> getMethodName(@RequestParam Long userID) {
        List<Review> reviews = reviewService.getReviewByUserID(userID);
        return reviews.stream().map(review -> new ReviewDTO(
            review.getReviewID(),
            review.getRestaurantID(),
            review.getUserID(),
            review.getReviewText(),
            review.getRating())).collect(Collectors.toList());    
    }
}
