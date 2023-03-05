package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Role;
import com.danyhry.diplomaapplication.model.User;

import java.util.List;
import java.util.Optional;

public interface UserDao {
    Optional<List<User>> getAllUsers();

    Optional<User> getUserById(Long id);

    int createUser(User user);

    Optional<User> getUserByEmail(String username);

    int deleteUserById(Long id);

    Optional<User> updateUser(User user, Long id);

    int updateUserPassword(Long id, String newPassword);

    Optional<String> getUserPasswordByEmail(String email);

    Optional<String> getAdminEmail();

    Optional<List<Role>> getRoles();
}
