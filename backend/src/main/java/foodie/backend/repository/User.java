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

/**
 * Creates a table for "Users" in the db alongside an one to many association between reviews.
 * Includes the creation of setters and getters.
 * 
 */
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(name = "[user]")
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

    private String username, password, email, address, pfp;

    /**
     * Constructs the User object with the necessary info
     * 
     * @param username
     * @param password
     * @param email
     * @param address
     * @param phoneNumber
     */
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

    /**
     * Default constructor
     */
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
  /**
   * Submit a review to a restaurant with text and rating, not implemented
   * 
   * @param restaurant
   * @param reviewText
   * @param rating
   */
  public void submitReview(
    Restaurant restaurant,
    String reviewText,
    int rating
  ) {
    //code here
  }

  // View restaurant details including reviews
  /**
   * View all the details of a restaurant alongisde the reviews, not implemented
   * 
   * @param restaurantId
   * @return a restaurant object
   */
  public Restaurant viewRestaurantDetails(Long restaurantId) {
    // Implementation to fetch restaurant details, reviews, and ratings
    return null;
  }

  /**
   * Get the user ID
   * 
   * @return the user ID
   */
    public long getUserID(){
      return userID;
  }

  /**
   * Get the username of the User
   * 
   * @return the username string
   */
  public String getUsername(){
      return username;
  }

  /**
   * Get the user's password
   * 
   * @return a password
   */
  public String getPassword(){
      return password;
  }

  /**
   * Get the email of the user
   * 
   * @return an email
   */
  public String getEmail() {
      return email;
  }

  /**
   * Get the user's address
   * 
   * @return an address
   */
  public String getAddress(){
      return address;
  }

  /**
   * Get the user's phone number
   * 
   * @return
   */
  public String getPhoneNumber(){
      return phoneNumber;
  }

  /**
   * Get the list of user's reviews
   * 
   * @return list of user reviews
   */
  public List<Review> getReviews() {
      return reviews;
  }
  
  /**
   * Get the user's role
   * 
   * @return the role
   */
  public Role getRole() {
    return role;
  }

  /**
   * Set the user's ID
   * 
   * @param userID
   */
  public void setUserID(long userID){
      this.userID = userID;
  }

  /** 
   * Sets the user's reviews
   */
  public void setReviews(List<Review> reviews) {
      this.reviews = reviews;
  }

  /**
   * Sets the user's email
   * 
   * @param email
   */
  public void setEmail(String email) {
    this.email = email;
  }

  /**
   * Sets the user's password
   * 
   * @param password
   */
  public void setPassword(String password) {
    this.password = password;
  }

  /**
   * Sets the user's username
   * 
   * @param username
   */
  public void setUsername(String username) {
    this.username = username;
  }

  /**
   * Sets the user's phone number
   * 
   * @param phoneNumber
   */
  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  /**
   * Sets the user's role
   * 
   * @param role
   */
  public void setRole(Role role) {
      this.role = role;
  }
 
  /**
   * Gets the id list of user's reviews
   * 
   * @return
   */
  public List<Long> getReviewID(){
      return reviews.stream().map(Review::getReviewID).collect(Collectors.toList());
  }
   
  /**
   * Get the user's profile picture
   * 
   * @return a picture string
   */
  public String getPfp() {
        return pfp;
  }

  /**
   * Sets the user's profile picture
   * 
   * @param pfp
   */
  public void setPfp(String pfp) {
        this.pfp = pfp;
  }
}

