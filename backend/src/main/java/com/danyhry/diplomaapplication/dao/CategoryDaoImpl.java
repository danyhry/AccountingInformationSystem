package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.dao.RowMappers.CategoryRowMapper;
import com.danyhry.diplomaapplication.model.Category;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class CategoryDaoImpl implements CategoryDao{

    private final JdbcTemplate jdbcTemplate;

    public CategoryDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
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

    @Override
    public Category createCategory(Category category) {
        String query = """
                INSERT INTO categories (name)
                VALUES (?)
                """;
        jdbcTemplate.update(query, category.getName());
        return category;
    }

    @Override
    public Category updateCategory(Category category, Long id) {
        String sql = """
                UPDATE categories
                SET name = ? WHERE id = ?
                """;
        jdbcTemplate.update(sql, category.getName(), id);
        return category;
    }

    @Override
    public int deleteById(Long id) {
        String query = "DELETE FROM categories WHERE id = ?";
        return jdbcTemplate.update(query, id);
    }
}
