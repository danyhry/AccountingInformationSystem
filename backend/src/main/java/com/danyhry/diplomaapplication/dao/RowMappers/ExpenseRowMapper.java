package com.danyhry.diplomaapplication.dao.RowMappers;

import com.danyhry.diplomaapplication.dao.UserDao;
import com.danyhry.diplomaapplication.model.Expense;
import com.danyhry.diplomaapplication.model.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ExpenseRowMapper implements RowMapper<Expense> {

    private final UserDao userDao;

    public ExpenseRowMapper(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public Expense mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        Expense expense = new Expense();
        User user = userDao.getUserById(resultSet.getLong("user_id"))
                .orElseThrow(() -> new RuntimeException("User not found"));

        expense.setId(resultSet.getLong("id"));
        expense.setUserId(user.getId());
        expense.setDescription(resultSet.getString("description"));
        expense.setAmount(resultSet.getLong("amount"));
        expense.setDate(resultSet.getDate("date").toLocalDate());
        return expense;
    }
}
