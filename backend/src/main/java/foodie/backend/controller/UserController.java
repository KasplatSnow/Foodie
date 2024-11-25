package foodie.backend.controller;

import foodie.backend.model.User;
import foodie.backend.repository.UserRepository;
import foodie.backend.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
  @Autowired
  private final UserService userService;

  public UserController(UserService userService){
    this.userService = userService;
  }

  @PostMapping("/create")
  public User createUser(@RequestBody User user) {
      return userService.createUser(user);
  }
  @GetMapping("/allusers")
  List<User> getAllUsers() {
    return userService.getAllUsers();
  }
}
