package foodie.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import foodie.backend.repository.Admin;
import foodie.backend.repository.AdminRepository;

/**
 * Service class that provides an Admin creation method for the db.
 */

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Create a new business owner
    /**
     * Creates a new Admin (business owner) in the system.
     *
     * @param admin the Admin object 
     * @return the created Admin object with the generated ID
     */
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }
} 