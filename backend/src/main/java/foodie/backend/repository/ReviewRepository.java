package foodie.backend.repository;

import foodie.backend.repository.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{

    @Query("SELECT r FROM Review r WHERE r.restaurant.restaurantID = :restaurantID AND r.user.userID = :userID")
    Review findReviewExist(@Param("restaurantID") Long restaurantID, @Param("userID") Long userID);

    //find single review
    @Query("SELECT r FROM Review r WHERE r.reviewID = :reviewID")
    Review findByID(@Param("reviewID") Long reviewID);

    //find all reviews of restaurant
    @Query("SELECT r FROM Review r WHERE r.restaurant.restaurantID = :restaurantID")
    List<Review> findAllRestaurantReviews(@Param("restaurantID") Long restaurantID);

    @Query("SELECT r FROM Review r WHERE r.user.userID = :userID")
    List<Review> findReviewByUserID(@Param("userID") Long userID);
}
