package foodie.backend.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
@DiscriminatorValue("BUSINESS")
public class BusinessOwner extends User{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long userID;

  private String username, password, email, address, phoneNumber;

  @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Restaurant> restaurants;

  public BusinessOwner(
    String username,
    String password,
    String email,
    String address,
    String phoneNumber
  ) {
    super(username, password, email, address, phoneNumber);
  }

  public BusinessOwner(){

  }

  // Add a new restaurant listing
  public void addRestaurant(Restaurant restaurant) {
    restaurant.setOwner(this); // Set the owner of the restaurant
    restaurants.add(restaurant);
  }

  // Update an existing restaurant's details
  public void updateRestaurantDetails(
    Restaurant restaurant,
    String name,
    String address,
    String hours,
    String description
  ) {
    restaurant.setName(name);
    restaurant.setAddress(address);
    restaurant.setHours(hours);
    restaurant.setDescription(description);
  }

  // View owned list of restaurants
  public List<Restaurant> viewOwnedRestaurants() {
    return this.restaurants;
  }
}
