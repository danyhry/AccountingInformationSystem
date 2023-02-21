package com.danyhry.diplomaapplication.dao;

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
        String query = "SELECT i.id, i.amount, i.description, i.date, u.id as user_id, u.role as user_role " +
                "FROM expenses i " +
                "LEFT JOIN users u ON i.user_id = u.id " +
                "WHERE i.id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(query, new Object[]{id}, new ExpenseRowMapper(userDao)));
    }

    @Override
    public Expense createExpense(Expense expense) {
        String query = "INSERT INTO expenses (user_id, description, amount, date) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(query, expense.getUserId(), expense.getDescription(), expense.getAmount(), expense.getDate());
        return expense;
    }

    @Override
    public Expense updateExpense(Expense expense) {
        String sql = "UPDATE expenses SET description = ?, amount = ?, date = ? WHERE id = ?";
        jdbcTemplate.update(sql, expense.getDescription(), expense.getAmount(), expense.getDate(), expense.getId());
        return expense;
    }

    @Override
    public int deleteById(Long id) {
        String query = "DELETE FROM expenses WHERE id = ?";
        return jdbcTemplate.update(query, id);
    }

    @Override
    public List<Expense> getExpensesByUserId(Long userId) {
        return null;
    }


}
