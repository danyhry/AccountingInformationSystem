package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Category;

import java.util.List;

public interface CategoryDao {
    List<Category> getAllCategories();

    Category getCategoryById(Long categoryId);

    Category createCategory(Category category);

    Category updateCategory(Category category, Long id);

    int deleteById(Long id);
}
