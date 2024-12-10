package foodie.backend.repository;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


/**
 * Creates a table for "Cuisine" in the db alongside details and a many-to-one association between restaurant.
 * Includes the creation of setters and getters.
 * 
 */
@Entity
@Table(name = "cuisine")
public class Cuisine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "restaurantID", referencedColumnName = "restaurantID")
    private Restaurant restaurant;
    
    private String cuisine;

    /**
     * Getter method for cuisine
     * 
     * @return a String representing the cuisine
     */
    public String getCuisine() {
        return cuisine;
    }

    /**
     * Setter method for cuisine
     * 
     * @param cuisine the cuisine to set to
     */
    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    /**
     * Getter method to retrieve the restaurant associated with the cuisine
     * 
     * @return the restaurant associated to
     */
    public Restaurant getRestaurant() {
        return restaurant;
    }

    /**
     * Setter method to set the resturant associated to the cuisine
     * 
     * @param restaurant the restuarant to associate with
     */
    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    /**
     * Getter method to retrieve ID of cuisine in table
     * 
     * @return the cuisine ID
     */
    public Long getId() {
        return id;
    }

    /**
     * Setter method to set ID of cuisine in table
     * 
     * @param id the cuisine ID
     */
    public void setId(Long id) {
        this.id = id;
    }

}
