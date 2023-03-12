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

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public List<User> getAllUsers() {
        return userDao.getAllUsers()
                .orElseThrow(() -> new NotFoundException("Користувачів не знайдено"));
    }

    @Override
    public User getUserById(Long id) {
        return userDao.getUserById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Користувача з id %s не знайдено", id)));
    }

    @Override
    public void deleteUserById(Long id) {
        Optional<User> users = userDao.getUserById(id);
        users.ifPresentOrElse(User -> {
            int result = userDao.deleteUserById(id);
            if (result != 1) {
                throw new IllegalStateException("Не вдалося видалити користувача");
            }
        }, () -> {
            log.error(String.format("User with id %s not found", id));
            throw new NotFoundException(String.format("Користувача з id %s не знайдено", id));
        });
    }

    @Override
    public User editUser(User updatedUser, Long id) {
        Optional<User> users = userDao.getUserById(id);

        return users.stream()
                .filter(Objects::nonNull)
                .findFirst()
                .map(firstUser -> {
                    User user = userDao.updateUser(updatedUser, firstUser.getId())
                            .orElseThrow(() -> new IllegalStateException("Не вдалося оновити користувача"));
                    user.setId(id);
                    return user;
                })
                .orElseThrow(() -> new NotFoundException(String.format("Користувача з id %s не знайдено", id)));
    }

    @Override
    public User findByEmail(String email) {
        return this.userDao.getUserByEmail(email)
                .orElseThrow(() -> new NotFoundException("Користувача з поштою " + email + " не знайдено"));
    }

    @Override
    public void updateUserPassword(Long id,
                                   String oldPassword,
                                   String newPassword,
                                   String confirmPassword) throws UserException {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        try {
            if (!newPassword.equals(confirmPassword)) {
                throw new UserException("Паролі мають співпадати");
            }
            String email = userDao.getUserById(id)
                    .orElseThrow(() -> new UserException("Користувача не знайдено"))
                    .getEmail();
            String dbPass = userDao.getUserPasswordByEmail(email)
                    .orElseThrow(() -> new NotFoundException("Пароль користувача не знайдено"));
            if (!encoder.matches(oldPassword, dbPass) || StringUtils.isBlank(newPassword)) {
                throw new UserException("Неправильний пароль");
            }
        } catch (UserException e) {
            throw new UserException(e.getMessage());
        }

        userDao.updateUserPassword(id, encoder.encode(newPassword));
    }

    @Override
    public List<Role> getRoles() {
        return this.userDao.getRoles()
                .orElseThrow(() -> new NotFoundException("Ролей не знайдено"));
    }
}
