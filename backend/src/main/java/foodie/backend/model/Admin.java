import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Admin extends User{
    private String username, role, password, email, address, phoneNumber;
    private long userID;

  public Admin(
    String username,
    String role,
    String password,
    String email,
    String address,
    String phoneNumber
  ) {
    super(username, "ADMIN", password, email, address, phoneNumber);
  }

  //check for duplicate listings
  public void checkForDuplicateListings(List<Restaurant> restaurantList) {
    Map<String, List<Restaurant>> duplicates = restaurantList
      .stream()
      .collect(
        Collectors.groupingBy(
          restaurant -> restaurant.getName() + restaurant.getAddress()
        )
      );

    //print out duplicates and remove them if needed
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

      //method to check for and remove duplicates from the database
    public void checkForDuplicateListingsInDB(Connection con) {
        PreparedStatement statement = null;
        ResultSet resultSet = null;

        try {
            //query to find duplicate listings based on 'name' and 'address'
            String query = "SELECT name, address, COUNT(*) as count " +
                           "FROM restaurants " +
                           "GROUP BY name, address " +
                           "HAVING count > 1";
            statement = con.prepareStatement(query);
            resultSet = statement.executeQuery();

            //iterate over duplicate records and delete them
            while (resultSet.next()) {
                String name = resultSet.getString("name");
                String address = resultSet.getString("address");
                int count = resultSet.getInt("count");

                System.out.println("Duplicate found: " + count + " entries for " + name + " at " + address);

                //now remove duplicates, keeping one entry
                removeDuplicates(con, name, address);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } 
    }

    //method to remove duplicate restaurants (keep one)
    private void removeDuplicates(Connection con, String name, String address) throws SQLException {
      //query to get all restaurant IDs with the same name and address
      String query = "SELECT id FROM restaurants WHERE name = ? AND address = ?";
      PreparedStatement statement = con.prepareStatement(query);
      statement.setString(1, name);
      statement.setString(2, address);
      ResultSet resultSet = statement.executeQuery();

      List<Integer> duplicateIds = new ArrayList<>();
      while (resultSet.next()) {
          duplicateIds.add(resultSet.getInt("id"));
      }

      //keep the first restaurant (ID with the smallest value) and delete the others
      if (duplicateIds.size() > 1) {
          Collections.sort(duplicateIds);
          int keepId = duplicateIds.get(0); //keep first one

          //delete rest
          for (int i = 1; i < duplicateIds.size(); i++) {
            int duplicateId = duplicateIds.get(i);
            removeRestaurant(con, duplicateId);
          }
              
        System.out.println("Deleted " + (duplicateIds.size() - 1) + " duplicate(s) for " + name + " at " + address);
      }

      resultSet.close();
      statement.close();
    }
    //remove a business via id
    private void removeRestaurant(Connection con, int duplicateId) throws SQLException {
      String query = "DELETE FROM restaurants WHERE id = ?";
      PreparedStatement statement = con.prepareStatement(query);
      statement.setInt(1, duplicateId);
      statement.executeUpdate();
      statement.close();
    }

    // Remove a closed business via object
    public void removeRestaurant(List<Restaurant> restaurants, Restaurant restaurant, Connection con) {
      try {
        String query = "DELETE FROM restaurants WHERE id = ?";
        PreparedStatement statement = con.prepareStatement(query);
        statement.setLong(1, restaurant.getRestaurantID());
        statement.executeUpdate();
        statement.close();
      } catch (Exception e) {
      }
      restaurants.remove(restaurant);
    }
}
