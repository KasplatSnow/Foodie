package foodie.backend.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for performing CRUD operations on "Cuisines".
 * Extends JpaRepository to provide built-in methods
 */
@Repository
public interface CuisineRepository extends JpaRepository<Cuisine, Long> {
    
}

