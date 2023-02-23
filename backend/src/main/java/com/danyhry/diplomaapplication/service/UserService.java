package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.exception.UserException;
import com.danyhry.diplomaapplication.model.Role;
import com.danyhry.diplomaapplication.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User getUserById(Long id);

    void deleteUserById(Long id);

    User editUser(User user, Long id);

    User findByEmail(String email);

    void updateUserPassword(Long id,
                            String oldPassword,
                            String newPassword,
                            String confirmPassword) throws UserException;

    List<Role> getRoles();
}
