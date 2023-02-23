package com.danyhry.diplomaapplication.dao.RowMappers;

import com.danyhry.diplomaapplication.model.Role;
import com.danyhry.diplomaapplication.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

@Slf4j
public class UserRowMapper implements RowMapper<User> {

    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(rs.getLong("id"));
        user.setFirstName(rs.getString("name"));
        user.setLastName(rs.getString("surname"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));

        Role role = new Role();
        role.setId(rs.getLong("role_id"));
        role.setName(rs.getString("role_name"));
        user.setRole(role);

        return user;
    }
}
