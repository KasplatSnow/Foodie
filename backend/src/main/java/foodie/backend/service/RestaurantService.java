package foodie.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import foodie.backend.model.Restaurant;

import foodie.backend.repository.RestaurantRepository;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    public List<Restaurant> searchRestaurants(String name, String cuisine, int price, float rating) {
        return restaurantRepository.searchRestaurants(name, cuisine, price, rating);
    }
}
