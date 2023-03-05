package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.dao.RowMappers.CategoryRowMapper;
import com.danyhry.diplomaapplication.model.Category;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Slf4j
@Component
public class CategoryDaoImpl implements CategoryDao{

    private final JdbcTemplate jdbcTemplate;

    public CategoryDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Optional<List<Category>> getAllCategories() {
        String sql = "SELECT * FROM categories;";
        return Optional.of(jdbcTemplate.query(sql, new CategoryRowMapper()));
    }

    @Override
    public Optional<Category> getCategoryById(Long categoryId) {
        String query = "SELECT * FROM categories WHERE id = ?;";
        return Optional.ofNullable(jdbcTemplate.queryForObject(query, new Object[]{categoryId}, new CategoryRowMapper()));
    }

    @Override
    public Optional<Category> createCategory(Category category) {
        String query = """
                INSERT INTO categories (name)
                VALUES (?)
                """;
        jdbcTemplate.update(query, category.getName());
        return Optional.of(category);
    }

    @Override
    public Optional<Category> updateCategory(Category category, Long id) {
        String sql = """
                UPDATE categories
                SET name = ? WHERE id = ?
                """;
        jdbcTemplate.update(sql, category.getName(), id);
        return Optional.of(category);
    }

    @Override
    public int deleteById(Long id) {
        String query = "DELETE FROM categories WHERE id = ?";
        return jdbcTemplate.update(query, id);
    }
}
