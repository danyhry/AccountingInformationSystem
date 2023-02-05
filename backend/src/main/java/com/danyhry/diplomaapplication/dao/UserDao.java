package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.User;

import java.util.List;
import java.util.Optional;

public interface UserDao {
    List<User> getAllUsers();

    Optional<User> getUserById(Long id);

    int createUser(User user);

    Optional<User> findByEmail(String username);
}
