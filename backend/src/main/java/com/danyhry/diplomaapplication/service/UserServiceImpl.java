package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.dao.UserDao;
import com.danyhry.diplomaapplication.exception.NotFoundException;
import com.danyhry.diplomaapplication.exception.UserException;
import com.danyhry.diplomaapplication.model.Role;
import com.danyhry.diplomaapplication.model.User;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = userDao.getAllUsers();
        if (users.isEmpty()) {
            throw new NotFoundException("Users are not found");
        }

        log.info("users: {}", users);
        return users.stream().toList();
    }

    @Override
    public User getUserById(Long id) {
        return userDao.getUserById(id)
                .orElseThrow(() -> new NotFoundException("Not found User by id = " + id));
    }

    @Override
    public void deleteUserById(Long id) {
        Optional<User> users = userDao.getUserById(id);
        users.ifPresentOrElse(User -> {
            int result = userDao.deleteUserById(id);
            if (result != 1) {
                log.error("Could not delete User");
                throw new IllegalStateException("Could not delete User");
            }
        }, () -> {
            log.error(String.format("User with id %s not found", id));
            throw new NotFoundException(String.format("User with id %s not found", id));
        });
    }

    @Override
    public User editUser(User updatedUser, Long id) {
        Optional<User> users = userDao.getUserById(id);

        return users.stream()
                .filter(Objects::nonNull)
                .findFirst()
                .map(firstUser -> {
                    User user = userDao.updateUser(updatedUser, firstUser.getId());
                    if (user == null) {
                        log.error("Could not update User");
                        throw new IllegalStateException("Could not update User");
                    }
                    user.setId(id);
                    return user;
                })
                .orElseThrow(() -> new NotFoundException(String.format("User with id %s not found", id)));
    }

    @Override
    public User findByEmail(String email) {
        return this.userDao.getUserByEmail(email).orElseThrow();
    }

    @Override
    public void updateUserPassword(Long id,
                                   String oldPassword,
                                   String newPassword,
                                   String confirmPassword) throws UserException {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        try {
            if (!newPassword.equals(confirmPassword)) {
                throw new UserException("Passwords must be same");
            }
            String email = userDao.getUserById(id)
                    .orElseThrow(() -> new UserException("User not found"))
                    .getEmail();
            String dbPass = userDao.getUserPasswordByEmail(email);
            if (!encoder.matches(oldPassword, dbPass) || StringUtils.isBlank(newPassword)) {
                throw new UserException("Wrong Password");
            }
        } catch (UserException e) {
            throw new UserException(e.getMessage());
        }

        userDao.updateUserPassword(id, encoder.encode(newPassword));
    }

    @Override
    public List<Role> getRoles() {
        return this.userDao.getRoles();
    }
}
