import java.util.List;

public class BusinessOwner extends User{
private String username, role, password, email, address, phoneNumber;
private List<Restaurant> restaurants;
private long userID;

  public BusinessOwner(
    String username,
    String role,
    String password,
    String email,
    String address,
    String phoneNumber
  ) {
    super(username, "BUSINESS", password, email, address, phoneNumber);
  }


  //add a new restaurant listing
  public void createNewRestaurant(long restaurantID,
  String name,
  BusinessOwner owner,
  String address,
  int zipCode,
  String phoneNumber,
  String email,
  String cuisine,
  String hours,
  String description,
  float rating,
  int price) {
    Restaurant restaurant = new Restaurant(restaurantID, name, this, address, zipCode, phoneNumber, email, cuisine, hours, description, rating, price);
    restaurants.add(restaurant);
  }

  public void addRestaurant(Restaurant restaurant){
    restaurant.setBusinessOwner(this);
    restaurants.add(restaurant);
  }

  //update an existing restaurant's details
  public void updateRestaurantDetails(
    Restaurant restaurant,
    String name,
    BusinessOwner owner,
    String address,
    String phoneNumber,
    String hours,
    String description
  ) {
    restaurant.setName(name);
    restaurant.setAddress(address);
    restaurant.setPhoneNumber(phoneNumber);
    restaurant.setHours(hours);
    restaurant.setDescription(description);
  }

  //view owned list of restaurants
  public List<Restaurant> viewOwnedRestaurants() {
    //depending on page, will loop through restaurants to display them
    return this.restaurants;
  }
}
