package com.foodie.foodiebackend.controller;

import com.foodie.foodiebackend.dto.UserRequest;
import com.foodie.foodiebackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String placeOrder(@RequestBody UserRequest userRequest) {
        userService.createUser(userRequest);
        return "User Registered";
    }
}
