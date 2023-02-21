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
    private final UserDao userDao;

    public IncomeDaoImpl(JdbcTemplate jdbcTemplate, UserDao userDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.userDao = userDao;
    }

    @Override
    public List<Income> getAllIncomes() {
        String query = "SELECT * FROM incomes";
        return jdbcTemplate.query(query, new IncomeRowMapper(userDao));
    }

    @Override
    public Optional<Income> getIncomeById(Long id) {
        String query = "SELECT i.id, i.amount, i.description, i.date, u.id as user_id, u.role as user_role " +
                "FROM incomes i " +
                "LEFT JOIN users u ON i.user_id = u.id " +
                "WHERE i.id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(query, new Object[]{id}, new IncomeRowMapper(userDao)));
    }

    @Override
    public Income createIncome(Income income) {
        log.info("income: {}", income);
        String query = "INSERT INTO incomes (user_id, description, amount, date) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(query, income.getUserId(), income.getDescription(), income.getAmount(), income.getDate());
        return income;
    }

    @Override
    public Income updateIncome(Income income) {
        log.info("incomeUpdate: {}", income);
        String sql = "UPDATE incomes SET description = ?, amount = ?, date = ? WHERE id = ?";
        jdbcTemplate.update(sql, income.getDescription(), income.getAmount(), income.getDate(), income.getId());
        return income;
    }

    @Override
    public int deleteById(Long id) {
        String query = "DELETE FROM incomes WHERE id = ?";
        return jdbcTemplate.update(query, id);
    }

}
