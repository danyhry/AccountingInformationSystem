package com.danyhry.diplomaapplication.controller;

import com.danyhry.diplomaapplication.exception.UserException;
import com.danyhry.diplomaapplication.model.User;
import com.danyhry.diplomaapplication.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public void editUser(@RequestBody User user, @PathVariable Long id) {
        userService.editUser(user, id);
    }

    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
    }

    @GetMapping("/user/me")
    public User getUserByToken(@RequestHeader(name = "Authorization") String token) {
//        TODO: need to be implemented
        return null;
    }
}
