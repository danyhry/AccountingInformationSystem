package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Budget;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Slf4j
@Component
public class BudgetDaoImpl implements BudgetDao {

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
}
