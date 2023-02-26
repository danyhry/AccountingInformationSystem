package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.dao.RowMappers.CategoryRowMapper;
import com.danyhry.diplomaapplication.model.Budget;
import com.danyhry.diplomaapplication.model.Category;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Slf4j
@Component
public class BudgetDaoImpl implements BudgetDao {

    private final JdbcTemplate jdbcTemplate;

    public BudgetDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Budget> getAllBudgets() {
        return null;
    }

    @Override
    public Optional<Budget> getBudgetById(Long id) {
        return Optional.empty();
    }

    @Override
    public Budget addBudget(Budget budget) {
        return null;
    }

    @Override
    public void updateBudget(Budget budget) {
    }

    @Override
    public Budget getBudgetByUserId(Long userId) {
        return null;
    }

    @Override
    public List<Category> getAllCategories() {
        String sql = "SELECT * FROM categories;";
        return jdbcTemplate.query(sql, new CategoryRowMapper());
    }

    @Override
    public Category getCategoryById(Long categoryId) {
        String query = "SELECT * FROM categories WHERE id = ?;";
        return jdbcTemplate.queryForObject(query, new Object[]{categoryId},new CategoryRowMapper());
    }
}
