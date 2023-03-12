package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.dao.CategoryDao;
import com.danyhry.diplomaapplication.exception.NotFoundException;
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
        return categoryDao.getAllCategories()
                .orElseThrow(() -> new NotFoundException("Категорій не знайдено"));
    }

    public Category getCategoryById(Long categoryId) {
        return categoryDao.getCategoryById(categoryId)
                .orElseThrow(() -> new NotFoundException("Категорія не знайдена"));
    }

    public Category createCategory(Category category) {
        return categoryDao.createCategory(category)
                .orElseThrow(() -> new NotFoundException("Категорія не створена"));
    }

    public Category updateCategory(Category category, Long id) {
        return categoryDao.updateCategory(category, id)
                .orElseThrow(() -> new NotFoundException("Категорія не оновлена"));
    }

    public boolean deleteCategory(Long id) {
        return categoryDao.deleteById(id) == 1;
    }
}
