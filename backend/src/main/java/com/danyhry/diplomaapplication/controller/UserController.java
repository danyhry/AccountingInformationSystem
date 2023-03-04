package com.danyhry.diplomaapplication.controller;

import com.danyhry.diplomaapplication.exception.UserException;
import com.danyhry.diplomaapplication.model.Role;
import com.danyhry.diplomaapplication.model.User;
import com.danyhry.diplomaapplication.service.JwtService;
import com.danyhry.diplomaapplication.service.MailSenderService;
import com.danyhry.diplomaapplication.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final MailSenderService mailSenderService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> editUser(@RequestBody User updatedUser, @PathVariable Long id) {
        User user = userService.editUser(updatedUser, id);
        log.info("Updated user: {}", user);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
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

    @PostMapping("/message")
    public void sendMessageToAdmin(@RequestBody Map<String, String> contactFormValues) throws MessagingException, UnsupportedEncodingException {
        Boolean isEmailSent = mailSenderService.sendMessageToAdmin(contactFormValues);
    }

    @GetMapping("/roles")
    public List<Role> getRoles() {
        return userService.getRoles();
    }
}
