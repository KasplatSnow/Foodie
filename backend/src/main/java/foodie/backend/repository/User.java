package foodie.backend.repository;
 
import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(name = "user")
@DiscriminatorColumn(name = "role", discriminatorType=DiscriminatorType.STRING)
@DiscriminatorValue("USER")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userID;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews;

    //@JsonProperty("role")
    @Enumerated(EnumType.STRING)
    @Column(insertable = false, updatable = false) // Ensure the column is not duplicated
    private Role role;

    private String phoneNumber;

    private String username, password, email, address;

    public User(
    String username,
    String password,
    String email,
    String address,
    String phoneNumber
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public User(){

    }

  // Search restaurants by name, category, price, etc.
  /*
   *   public List<Restaurant> searchRestaurants(
    String name,
    String category,
    String priceRange,
    int rating
  ) throws Exception {
    //code here

    String statement = "FROM Restaurant R WHERE R.name = ?, R.category = ?, R.priceRange = ?, R.rating = ?";
    Query query = session.createQuery(statement);
    List results = query.list();
    return null;
  }
   */

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

    public long getUserID(){
      return userID;
  }

  public String getUsername(){
      return username;
  }

  public String getPassword(){
      return password;
  }

  public String getEmail() {
      return email;
  }

  public String getAddress(){
      return address;
  }

  public String getPhoneNumber(){
      return phoneNumber;
  }

  public List<Review> getReviews() {
      return reviews;
  }
  
  public Role getRole() {
    return role;
  }
  public void setUserID(long userID){
      this.userID = userID;
  }

  public void setReviews(List<Review> reviews) {
      this.reviews = reviews;
  }
  public void setEmail(String email) {
    this.email = email;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public void setRole(Role role) {
      this.role = role;
  }
 
  public List<Long> getReviewID(){
      return reviews.stream().map(Review::getReviewID).collect(Collectors.toList());
  }
}

