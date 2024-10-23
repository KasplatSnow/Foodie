package foodie.backend.model;

import java.util.List;
import javax.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@NoArgsConstructor
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long UserID;

  @Column(nullable = false, unique = true)
  private String username;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false, unique = true)
  private String phoneNumber;

  @Column(nullable = false)
  private String role;

  public User(
    String username,
    String password,
    String email,
    String phoneNumber,
    String role
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.role = role;
  }

  // Search restaurants by name, category, price, etc.
  public List<Restaurant> searchRestaurants(
    String name,
    String category,
    String priceRange,
    int rating
  ) {
    //code here
    return null;
  }

  // Submit a review and rating
  public void submitReview(
    Restaurant restaurant,
    String reviewText,
    int rating
  ) {
    //code here
  }

  // View restaurant details including reviews
  public Restaurant viewRestaurantDetails(Long restaurantId) {
    // Implementation to fetch restaurant details, reviews, and ratings
    return null;
  }
}
