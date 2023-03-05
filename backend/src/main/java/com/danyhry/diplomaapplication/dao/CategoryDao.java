package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryDao {
    Optional<List<Category>> getAllCategories();

    Optional<Category> getCategoryById(Long categoryId);

    Optional<Category> createCategory(Category category);

    Optional<Category> updateCategory(Category category, Long id);

    int deleteById(Long id);
}
