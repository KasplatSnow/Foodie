package foodie.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import foodie.backend.model.BusinessOwner;

import foodie.backend.repository.BusinessOwnerRepository;

@Service
public class BusinessOwnerService {

    @Autowired
    private BusinessOwnerRepository businessOwnerRepository;

    // Create a new business owner
    public BusinessOwner createBusinessOwner(BusinessOwner businessOwner) {
        return businessOwnerRepository.save(businessOwner);
    }
}