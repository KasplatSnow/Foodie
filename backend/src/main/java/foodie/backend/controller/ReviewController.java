package foodie.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import foodie.backend.service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        if (reviewService.getReviewExist(writeRequest.getRestaurant().getRestaurantID(), writeRequest.getUser().getUserID())) {
            return ResponseEntity.badRequest().body("User wrote review already");
        }
    
        //verify request
        if (writeRequest.getRating() == null) {
            return ResponseEntity.badRequest().body("Rating is required");
        }
        if (writeRequest.getReviewText() == null || writeRequest.getReviewText().isEmpty()) {
            return ResponseEntity.badRequest().body("Review is required");
        }
        if (writeRequest.getRestaurant() == null) {
            return ResponseEntity.badRequest().body("RestaurantID is required");
        }
        if (writeRequest.getUser() == null) {
            return ResponseEntity.badRequest().body("UserID is required");
        }

        Review newReview= new Review(writeRequest.getUser(), writeRequest.getRestaurant(), writeRequest.getReviewText(), writeRequest.getRating());
        
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
            review.getRestaurant().getRestaurantID(),
            review.getUser().getUserID(),
            review.getReviewText(),
            review.getRating())).collect(Collectors.toList());
    }
}