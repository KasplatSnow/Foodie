package foodie.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import foodie.backend.model.Restaurant;
import foodie.backend.model.User;
import foodie.backend.repository.RestaurantService;
import foodie.backend.repository.UserService;
 
@RestController
@RequestMapping("/admin")
public class AdminController {
  @Autowired
  private RestaurantService restaurantService;

}
