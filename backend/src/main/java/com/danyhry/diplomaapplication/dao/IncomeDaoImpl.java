package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.dao.RowMappers.IncomeRowMapper;
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
        String query = "SELECT incomes.*, roles.name as role_name " +
                "FROM incomes " +
                "LEFT JOIN users ON incomes.user_id = users.id " +
                "LEFT JOIN roles ON users.role_id = roles.id " +
                "WHERE incomes.id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(query, new Object[]{id}, new IncomeRowMapper(userDao)));
    }

    @Override
    public Income createIncome(Income income) {
        log.info("income: {}", income);
        String query = "INSERT INTO incomes (user_id, category_id, description, amount, date) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(query, income.getUserId(), income.getCategoryId(), income.getDescription(), income.getAmount(), income.getDate());
        return income;
    }

    @Override
    public Income updateIncome(Income income) {
        log.info("incomeUpdate: {}", income);
        String sql = "UPDATE incomes SET category_id = ?, description = ?, amount = ?, date = ? WHERE id = ?";
        jdbcTemplate.update(sql, income.getCategoryId(), income.getDescription(), income.getAmount(), income.getDate(), income.getId());
        return income;
    }

    @Override
    public int deleteById(Long id) {
        String query = "DELETE FROM incomes WHERE id = ?";
        return jdbcTemplate.update(query, id);
    }

    @Override
    public List<Income> getIncomesByUserId(Long userId) {
        String sql = "SELECT i.*, r.name as role_name " +
                "FROM incomes i " +
                "JOIN users u ON i.user_id = u.id " +
                "JOIN roles r ON u.role_id = r.id " +
                "WHERE i.user_id = ?";

        return jdbcTemplate.query(sql, new Object[]{userId}, new IncomeRowMapper(userDao));
    }

}
