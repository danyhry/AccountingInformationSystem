package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Role;
import com.danyhry.diplomaapplication.model.User;

import java.util.List;
import java.util.Optional;

public interface UserDao {
    List<User> getAllUsers();

    Optional<User> getUserById(Long id);

    int createUser(User user);

    Optional<User> getUserByEmail(String username);

    int deleteUserById(Long id);

    User updateUser(User user, Long id);

    int updateUserPassword(Long id, String newPassword);

    String getUserPasswordByEmail(String email);

    String getAdminEmail();

    List<Role> getRoles();
}
