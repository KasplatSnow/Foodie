package foodie.backend.model;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "business_owners")
@Data
@NoArgsConstructor
public class BusinessOwner extends User {
  private String businessName; // Example field specific to business owner

  public BusinessOwner(
    String username,
    String password,
    String email,
    String phoneNumber,
    String businessName
  ) {
    super(username, password, email, phoneNumber, "business_owners");
    this.businessName = businessName;
  }

  @OneToMany(mappedBy = "owner")
  private List<Restaurant> restaurants;

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
    String contactInfo,
    String hours,
    String description
  ) {
    restaurant.setName(name);
    restaurant.setAddress(address);
    restaurant.setContactInfo(contactInfo);
    restaurant.setHours(hours);
    restaurant.setDescription(description);
  }

  // View owned list of restaurants
  public List<Restaurant> viewOwnedRestaurants() {
    return this.restaurants;
  }
}
