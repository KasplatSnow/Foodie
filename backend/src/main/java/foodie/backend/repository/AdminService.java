package foodie.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import foodie.backend.repository.Admin;
import foodie.backend.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Create a new business owner
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }
} 