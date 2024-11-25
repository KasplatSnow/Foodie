package foodie.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import foodie.backend.model.Admin;
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