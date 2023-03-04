package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.dao.CategoryDao;
import com.danyhry.diplomaapplication.model.Category;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class CategoryService {

    private final CategoryDao categoryDao;

    public CategoryService(CategoryDao categoryDao) {
        this.categoryDao = categoryDao;
    }

    public List<Category> getAllCategories() {
        return categoryDao.getAllCategories();
    }

    public Category getCategoryById(Long categoryId) {
        return categoryDao.getCategoryById(categoryId);
    }

    public Category createCategory(Category category) {
        return categoryDao.createCategory(category);
    }

    public Category updateCategory(Category category, Long id) {
        return categoryDao.updateCategory(category, id);
    }

    public boolean deleteCategory(Long id) {
        return categoryDao.deleteById(id) == 1;
    }
}
