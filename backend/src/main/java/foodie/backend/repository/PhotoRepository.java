package foodie.backend.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;

/**
 * Repository interface for performing CRUD operations on "Photos".
 * Extends JpaRepository to provide built-in methods using db queries.
 */

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    
    @Query("SELECT photo FROM Photo WHERE restaurant.restaurantID = :restaurantID")
    List<String> findByRestaurantID(@Param("restaurantID") Long restaurantID);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Photo WHERE restaurant.restaurantID = :restaurantID AND photo = :photoToRemove")
    public void deleteByRestaurantID(Long restaurantID, String photoToRemove);
}

