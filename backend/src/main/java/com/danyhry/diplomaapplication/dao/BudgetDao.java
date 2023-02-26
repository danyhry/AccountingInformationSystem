package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Budget;
import com.danyhry.diplomaapplication.model.Category;

import java.util.List;
import java.util.Optional;

public interface BudgetDao {
    List<Budget> getAllBudgets();

    Optional<Budget> getBudgetById(Long id);

    Budget addBudget(Budget budget);

    void updateBudget(Budget budget);

    Budget getBudgetByUserId(Long userId);

    List<Category> getAllCategories();

    Category getCategoryById(Long categoryId);
}
