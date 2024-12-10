package foodie.backend.repository;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

/**
 * Class representing a business owner.
 * This class extends the `User` entity and adds the ability to view a list of restaurants.
 */

@Entity
@DiscriminatorValue("BUSINESS")
public class BusinessOwner extends User{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long userID;

  private String username, password, email, address, phoneNumber;

  @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Restaurant> restaurants;

   /**
   * Constructs a new BusinessOwner with the specified details.
   * 
   * @param username the username of the business owner
   * @param password the password of the business owner
   * @param email the email address of the business owner
   * @param address the real-life address of the business owner
   * @param phoneNumber the phone number of the business owner
   */
  public BusinessOwner(
    String username,
    String password,
    String email,
    String address,
    String phoneNumber
  ) {
    super(username, password, email, address, phoneNumber);
  }

  /**
   * Default constructor for the BusinessOwner.
   */
  public BusinessOwner(){

  }
  
  // View owned list of restaurants
   /**
   * Gets the full list of restaurants owned by the business owner
   * 
   * @return a list of Restaurants owned by the business owner
   */
  public List<Restaurant> getRestaurants() {
    return this.restaurants;
  }
  
  /**
   * Gets the list of restaurant IDs for the restaurants owned by this business owner.
   * 
   * @return a list of restaurant IDs
   */
  public List<Long> getRestaurantID(){
    return restaurants.stream().map(Restaurant::getRestaurantID).collect(Collectors.toList());
  } 
}
