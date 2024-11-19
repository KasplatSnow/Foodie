public class User {
    private String username, role, password, email, address, phoneNumber;
    private long userID;
    public User(
    String username,
    String role,
    String password,
    String email,
    String address,
    String phoneNumber
    ) {
        this.username = username;
        this.role = role;
        this.password = password;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    // Search restaurants by name, category, price, etc.
    public ResultSet searchRestaurants(
        Connection con, String name,
        String category,
        String priceRange,
        int rating
    ) throws Exception {

        String query = "FROM Restaurant R WHERE R.name = ?, R.category = ?, R.priceRange = ?, R.rating = ?";
        PreparedStatement preparedStatement = con.prepareStatement(query);
        ResultSet resultSet = preparedStatement.executeQuery();
        return resultSet;
    }

    // Submit a review and rating
    public void submitReview(
        Restaurant restaurant,
        String reviewText,
        int rating
    ) {
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

    public String getRole(){
        return role;
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

    public void setUserID(long userID){
        this.userID = userID;
    }

    public void search(){

    }
}

