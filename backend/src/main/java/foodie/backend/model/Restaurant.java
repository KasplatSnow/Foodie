package foodie.backend.model;

import java.util.List;
import javax.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "restaurants")
@Data
@NoArgsConstructor
public class Restaurant {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long restaurantID;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String address;

  @Column(nullable = false)
  private String contactInfo;

  @Column(nullable = false)
  private String hours;

  @Column(columnDefinition = "TEXT")
  private String description;

  @ElementCollection
  private List<String> photos; // List of photo URLs or file paths

  @Column(nullable = false)
  private String category; // Cuisine type (e.g., Italian, Vegan)

  @Column(nullable = false)
  private String priceRange; // Low/Medium/High

  @Column(nullable = false)
  private int rating; // 1-5 star rating

  @ManyToOne
  @JoinColumn(name = "owner_id")
  private BusinessOwner owner;

  @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
  private List<Review> reviews;

  // Add a photo to the restaurant
  public void addPhoto(String photoUrl) {
    this.photos.add(photoUrl);
  }

  // Update the contact info and hours
  public void updateDetails(
    String contactInfo,
    String hours,
    String description
  ) {
    this.contactInfo = contactInfo;
    this.hours = hours;
    this.description = description;
  }
}
