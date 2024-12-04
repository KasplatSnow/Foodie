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
  
  // View owned list of restaurants
  public List<Restaurant> getRestaurants() {
    return this.restaurants;
  }
  
  public List<Long> getRestaurantID(){
    return restaurants.stream().map(Restaurant::getRestaurantID).collect(Collectors.toList());
  } 
}
