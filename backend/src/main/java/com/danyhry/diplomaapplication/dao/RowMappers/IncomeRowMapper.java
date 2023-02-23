package com.danyhry.diplomaapplication.dao.RowMappers;

import com.danyhry.diplomaapplication.dao.UserDao;
import com.danyhry.diplomaapplication.model.Income;
import com.danyhry.diplomaapplication.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

@Slf4j
public class IncomeRowMapper implements RowMapper<Income> {

    private final UserDao userDao;

    public IncomeRowMapper(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public Income mapRow(ResultSet resultSet, int i) throws SQLException {
        Income income = new Income();
        User user = userDao.getUserById(resultSet.getLong("user_id"))
                .orElseThrow(() -> new RuntimeException("User not found"));

        income.setId(resultSet.getLong("id"));
        income.setUserId(user.getId());
        income.setCategoryId(resultSet.getLong("category_id"));
        income.setDescription(resultSet.getString("description"));
        income.setAmount(resultSet.getLong("amount"));
        income.setDate(resultSet.getDate("date").toLocalDate());
        return income;
    }
}
