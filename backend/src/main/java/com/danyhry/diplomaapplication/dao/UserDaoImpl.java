package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

import static com.danyhry.diplomaapplication.model.Role.convertFromRoleToInt;

@Slf4j
@Component
public class UserDaoImpl implements UserDao {

    private final JdbcTemplate jdbcTemplate;

    public UserDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<User> getAllUsers() {
        return jdbcTemplate.query("SELECT * FROM users", new UserRowMapper());
    }

    @Override
    public Optional<User> getUserById(Long id) {
        String sql = "SELECT * FROM users WHERE user_id = ?";
        return jdbcTemplate.query(sql, new UserRowMapper(), id)
                .stream()
                .findFirst();
    }

    @Override
    public int createUser(User user) {
        String sql = "INSERT INTO users(name, surname, email, password, role) VALUES (?, ?, ?, ?, ?)";
        log.info(String.valueOf(user));
        return jdbcTemplate.update(
                sql,
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPassword(),
                convertFromRoleToInt(user.getRole())
        );
    }

    @Override
    public Optional<User> findByEmail(String email) {
        String sql = "SELECT * FROM users WHERE email = ?";
        return jdbcTemplate.query(sql, new UserRowMapper(), email)
                .stream()
                .findFirst();
    }

    @Override
    public int deleteUserById(Long id) {
        String sql = "DELETE FROM users WHERE user_id = ?";
        return jdbcTemplate.update(sql, id);
    }

    @Override
    public int editUser(User user, Long id) {
        String sql = "UPDATE users SET name = ?, surname = ?, email = ?, role = ? " +
                "WHERE user_id = ?";
        log.info("user: {}", user);
        return jdbcTemplate.update(sql,
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                convertFromRoleToInt(user.getRole()),
                id);
    }
}
