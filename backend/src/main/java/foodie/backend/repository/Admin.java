package foodie.backend.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * Represents an admin user in the system. This class extends the
 * "User" class and includes specific fields and behaviors for an admin user.
 * The "Admin" class inherits the attributes of a "User", including
 * the username, password, email, address, and phone number. It also provides a
 * constructor for initializing these fields and a default constructor.
 * 
 */

@Entity
@DiscriminatorValue("ADMIN")
public class Admin extends User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userID;

    private String username, password, email, phoneNumber;


   /**
     * Constructs an "Admin" object with the specified values.
     *
     * @param username The username 
     * @param password The password
     * @param email The email address
     * @param address The real-life address 
     * @param phoneNumber The phone number
     */
  public Admin(
    String username,
    String password,
    String email,
    String address,
    String phoneNumber
  ) {
    super(username, password, email, address, phoneNumber);
  }

/**
     * Default constructor for the "Admin" class.
     */
  public Admin(){

  }
}
