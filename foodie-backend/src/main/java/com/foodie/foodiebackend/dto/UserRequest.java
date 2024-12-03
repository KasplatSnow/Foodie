package com.foodie.foodiebackend.dto;

public record UserRequest(Long id, String phoneNumber, String username, String password, String email, String address) {
}
