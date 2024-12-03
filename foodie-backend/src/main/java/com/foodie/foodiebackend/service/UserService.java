package com.foodie.foodiebackend.service;

import com.foodie.foodiebackend.dto.UserRequest;
import com.foodie.foodiebackend.model.User;
import com.foodie.foodiebackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    // Create a new user
    public User createUser(UserRequest userRequest) {
        // map user request to user object
        User user = new User();
        user.setPhoneNumber(userRequest.phoneNumber());
        user.setUsername(userRequest.username());
        user.setPassword(userRequest.password());
        user.setEmail(userRequest.email());
        user.setAddress(userRequest.address());

        // save to user repository
        userRepository.save(user);

        return user;
    }
}
