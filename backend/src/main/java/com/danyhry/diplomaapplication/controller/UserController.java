package com.danyhry.diplomaapplication.controller;

import com.danyhry.diplomaapplication.exception.UserException;
import com.danyhry.diplomaapplication.model.User;
import com.danyhry.diplomaapplication.service.JwtService;
import com.danyhry.diplomaapplication.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
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
        log.info("UserController token: {}", token);
        String email = jwtService.extractUsername(token);
        return userService.findByEmail(email);
    }

    @PutMapping("/updatePassword/{id}")
    public void updatePassword(@PathVariable Long id,
                               @RequestBody JsonNode requestBody) throws UserException {
        String oldPassword = requestBody.get("currentPassword").asText();
        String newPassword = requestBody.get("newPassword").asText();
        String confirmPassword = requestBody.get("renewPassword").asText();

        userService.updateUserPassword(id, oldPassword, newPassword, confirmPassword);
    }
}
