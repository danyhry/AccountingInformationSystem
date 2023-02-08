package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.dao.UserDao;
import com.danyhry.diplomaapplication.exception.NotFoundException;
import com.danyhry.diplomaapplication.exception.UserException;
import com.danyhry.diplomaapplication.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public void createUser(User user) throws UserException {
        boolean isUserExists = userDao.getUserById(user.getId()).stream().findFirst().isPresent();
        if (isUserExists) {
            throw new UserException("User already exists");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));

        int result = userDao.createUser(user);
        if (result != 1) {
            throw new IllegalStateException("Could not add User");
        }
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
    public void editUser(User user, Long id) {
        Optional<User> users = userDao.getUserById(id);
        users.ifPresentOrElse(firstUser -> {
            int result = userDao.editUser(user, id);
            if (result != 1) {
                log.error("Could not update User");
                throw new IllegalStateException("Could not update User");
            }
            log.info("User was updated");
        }, () -> {
            log.error(String.format("User with id %s not found", id));
            throw new NotFoundException(String.format("User with id %s not found", id));
        });
    }
}
