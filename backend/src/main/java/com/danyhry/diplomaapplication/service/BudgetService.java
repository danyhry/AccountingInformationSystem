package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.dao.BudgetDao;
import com.danyhry.diplomaapplication.model.Category;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class BudgetService {

    private final BudgetDao budgetDao;

    public BudgetService(BudgetDao budgetDao) {
        this.budgetDao = budgetDao;
    }


    public List<Category> getAllCategories() {
        return budgetDao.getAllCategories();
    }
}
