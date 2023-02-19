package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Income;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

public class IncomeRowMapper implements RowMapper<Income> {

    @Override
    public Income mapRow(ResultSet resultSet, int i) throws SQLException {
        Long id = resultSet.getLong("id");
        Long amount = resultSet.getLong("amount");
        String description = resultSet.getString("description");
        String category = resultSet.getString("category");
        LocalDate date = resultSet.getObject("date", LocalDate.class);

        Income income = new Income();
        income.setId(id);
        income.setAmount(amount);
        income.setDescription(description);
        income.setCategory(category);
        income.setDate(date);

        return income;
    }
}
