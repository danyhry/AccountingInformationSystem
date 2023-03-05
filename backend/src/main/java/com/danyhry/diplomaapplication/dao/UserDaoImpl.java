package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.dao.RowMappers.UserRowMapper;
import com.danyhry.diplomaapplication.exception.NotFoundException;
import com.danyhry.diplomaapplication.model.Role;
import com.danyhry.diplomaapplication.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Slf4j
@Component
public class UserDaoImpl implements UserDao {

    private final JdbcTemplate jdbcTemplate;

    public UserDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Optional<List<User>> getAllUsers() {
        String sql = """
                SELECT u.*, r.id as role_id, r.name as role_name
                FROM users u
                JOIN roles r ON u.role_id = r.id
                """;
        return Optional.of(jdbcTemplate.query(sql, new UserRowMapper()));
    }

    @Override
    public Optional<User> getUserById(Long id) {
        String sql = "SELECT u.*, r.id as role_id, r.name as role_name " +
                "FROM users u " +
                "JOIN roles r ON u.role_id = r.id " +
                "WHERE u.id = ?";
        return jdbcTemplate.query(sql, new UserRowMapper(), id)
                .stream()
                .findFirst();
    }

    @Override
    public int createUser(User user) {
        String sql = "INSERT INTO users(name, surname, email, password, role_id) VALUES (?, ?, ?, ?, ?)";
        log.info(String.valueOf(user));
        int rowsAffected = jdbcTemplate.update(
                sql,
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPassword(),
                user.getRole().getId()
        );

        if (rowsAffected > 0) {
            Long userId = jdbcTemplate.queryForObject("SELECT lastval()", Long.class);
            sql = "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)";
            rowsAffected = jdbcTemplate.update(sql, userId, user.getRole().getId());
        }
        return rowsAffected;
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        String sql = "SELECT u.id, u.name, u.surname, u.email, u.password, r.id as role_id, r.name as role_name "
                + "FROM users u "
                + "JOIN user_roles ur ON u.id = ur.user_id "
                + "JOIN roles r ON ur.role_id = r.id "
                + "WHERE u.email = ?";
        return jdbcTemplate.query(sql, new UserRowMapper(), email)
                .stream()
                .findFirst();
    }

    @Override
    public int deleteUserById(Long id) {
        String sql = "DELETE FROM users WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    @Override
    public Optional<User> updateUser(User user, Long id) {
        String sql = "UPDATE users SET name = ?, surname = ?, email = ?, role_id = ? " +
                "WHERE id = ?";
        log.info("user: {}", user);
        int rows = jdbcTemplate.update(sql,
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole().getId(),
                id);
        if (rows == 0) {
            return Optional.empty();
        }
        return Optional.of(user);
    }

    @Override
    public int updateUserPassword(Long id, String newPassword) {
        String sql = "UPDATE users SET password=? WHERE id=?";
        log.info("updateUsersPassword begin");
        return jdbcTemplate.update(sql, newPassword, id);
    }

    @Override
    public Optional<String> getUserPasswordByEmail(String email) {
        Optional<User> dbUser = getUserByEmail(email);
        return Optional.ofNullable(dbUser.stream()
                .findFirst().orElseThrow(() -> new NotFoundException("User not found"))
                .getPassword());
    }

    @Override
    public Optional<String> getAdminEmail() {
        String sql = "SELECT email FROM users WHERE role_id = 2 LIMIT 1";
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, String.class));
    }

    @Override
    public Optional<List<Role>> getRoles() {
        String sql = "SELECT * FROM roles";
        return Optional.of(jdbcTemplate.query(sql, (rs, rowNum) -> {
            Long id = rs.getLong("id");
            String name = rs.getString("name");
            return new Role(id, name);
        }));
    }
}
