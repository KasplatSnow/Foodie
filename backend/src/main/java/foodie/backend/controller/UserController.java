package foodie.backend.controller;

import foodie.backend.model.User;
import foodie.backend.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

public class UserController {
  @Autowired
  private UserRepository userService;

  @GetMapping("/users")
  List<User> getAllUsers() {
    return userService.findAll();
  }
}
