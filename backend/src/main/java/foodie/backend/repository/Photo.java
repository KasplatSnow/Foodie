package foodie.backend.repository;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;

/**
 * Creates a table for "Photo" in the db alongside an many-to-one association between restaurant.
 * Includes the creation of setters and getters.
 * 
 */

@Entity
@Table(name = "photo")
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "restaurantID", referencedColumnName = "restaurantID")
    private Restaurant restaurant;

    private String photo;

    // getters and setters

    /**
     * Get the photo string associated with a restaurant
     * 
     * @return the photo string
     */
    public String getPhoto() {
        return photo;
    }

    /**
     * Set the photo string to be associated with a restaurant
     * 
     * @param photo the photo string
     */
    public void setPhoto(String photo) {
        this.photo = photo;
    }

    /**
     * Gets the restaurant associated with the photo
     * 
     * @return the restaurant
     */
    public Restaurant getRestaurant() {
        return restaurant;
    }

    /**
     * Sets the restaurant associated with the photo
     * 
     * @param restaurant the restaurant
     */
    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    /**
     * Gets the ID of the photo
     * 
     * @return the ID of the photo
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the ID of the photo
     * 
     * @param id the ID of the photo
     */
    public void setId(Long id) {
        this.id = id;
    }

}
