package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Income;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Slf4j
@Component
public class IncomeDaoImpl implements IncomeDao {

    private final JdbcTemplate jdbcTemplate;

    public IncomeDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Income> getAllIncomes() {
        String query = "SELECT id, amount, description, category, date FROM incomes";
        return jdbcTemplate.query(query, new IncomeRowMapper());
    }

    @Override
    public Optional<Income> getIncomeById(Long id) {
        String query = "SELECT id, amount, description, category, date FROM incomes WHERE id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(query, new Object[]{id}, new IncomeRowMapper()));
    }

    @Override
    public Income createIncome(Income income) {
        log.info("income: {}", income);
        String query = "INSERT INTO incomes (amount, description, category, date) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(query, income.getAmount(), income.getDescription(), income.getCategory(), income.getDate());
        return income;
    }

    @Override
    public Income update(Income income) {
        log.info("incomeUpdate: {}", income);
        String query = "UPDATE incomes SET amount = ?, description = ?, category = ?, date = ? WHERE id = ?";
        jdbcTemplate.update(query, income.getAmount(), income.getDescription(), income.getCategory(), income.getDate(), income.getId());
        return income;
    }

    @Override
    public int deleteById(Long id) {
        String query = "DELETE FROM incomes WHERE id = ?";
        return jdbcTemplate.update(query, id);
    }

}
