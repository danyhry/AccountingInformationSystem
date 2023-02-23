package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.dao.RowMappers.ExpenseRowMapper;
import com.danyhry.diplomaapplication.model.Expense;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Slf4j
@Component
public class ExpenseDaoImpl implements ExpenseDao {

    private final JdbcTemplate jdbcTemplate;
    private final UserDao userDao;

    public ExpenseDaoImpl(JdbcTemplate jdbcTemplate, UserDao userDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.userDao = userDao;
    }

    @Override
    public List<Expense> getAllExpenses() {
        String query = "SELECT * FROM expenses";
        return jdbcTemplate.query(query, new ExpenseRowMapper(userDao));
    }

    @Override
    public Optional<Expense> getExpenseById(Long id) {
        String query = "SELECT e.*, roles.name as role_name " +
                "FROM expenses e " +
                "LEFT JOIN users ON e.user_id = users.id " +
                "LEFT JOIN roles ON users.role_id = roles.id " +
                "WHERE e.id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(query, new Object[]{id}, new ExpenseRowMapper(userDao)));
    }

    @Override
    public Expense createExpense(Expense expense) {
        String query = "INSERT INTO expenses (user_id,category_id, description, amount, date) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(query, expense.getUserId(), expense.getCategoryId(), expense.getDescription(), expense.getAmount(), expense.getDate());
        return expense;
    }

    @Override
    public Expense updateExpense(Expense expense) {
        String sql = "UPDATE expenses SET category_id = ?, description = ?, amount = ?, date = ? WHERE id = ?";
        jdbcTemplate.update(sql, expense.getCategoryId(), expense.getDescription(), expense.getAmount(), expense.getDate(), expense.getId());
        return expense;
    }

    @Override
    public int deleteById(Long id) {
        String query = "DELETE FROM expenses WHERE id = ?";
        return jdbcTemplate.update(query, id);
    }

    @Override
    public List<Expense> getExpensesByUserId(Long userId) {
        String sql = "SELECT e.*, r.name as role_name " +
                "FROM expenses e " +
                "JOIN users u ON e.user_id = u.id " +
                "JOIN roles r ON u.role_id = r.id " +
                "WHERE e.user_id = ?";

        return jdbcTemplate.query(sql, new Object[]{userId}, new ExpenseRowMapper(userDao));
    }


}
