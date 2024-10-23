package foodie.backend.model;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "admin")
@Data
@NoArgsConstructor
public class Admin extends User {

  public Admin(
    String username,
    String password,
    String email,
    String phoneNumber
  ) {
    super(username, password, email, phoneNumber, "ADMIN");
  }

  // Check for duplicate listings
  public void checkForDuplicateListings(List<Restaurant> restaurantList) {
    Map<String, List<Restaurant>> duplicates = restaurantList
      .stream()
      .collect(
        Collectors.groupingBy(
          restaurant -> restaurant.getName() + restaurant.getAddress()
        )
      );

    // Print out duplicates and remove them if needed
    duplicates.forEach(
      (identifier, restaurants) -> {
        if (restaurants.size() > 1) {
          System.out.println(
            "Duplicate found: " +
            restaurants.size() +
            " entries for " +
            identifier
          );
          restaurantList.removeAll(restaurants.subList(1, restaurants.size()));
        }
      }
    );
  }

  // Remove a closed business
  public void removeRestaurant(Restaurant restaurant) {}
}
