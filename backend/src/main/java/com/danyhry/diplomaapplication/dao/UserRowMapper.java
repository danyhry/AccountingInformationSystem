package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import static com.danyhry.diplomaapplication.model.Role.convertFromLongToRole;

public class UserRowMapper implements RowMapper<User> {

    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new User(
                rs.getLong("user_id"),
                rs.getString("name"),
                rs.getString("surname"),
                rs.getString("email"),
                rs.getString("password"),
                convertFromLongToRole(rs.getLong("role"))
        );

    }
}
