package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.dao.BudgetDao;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class BudgetService {

    private final BudgetDao budgetDao;

    public BudgetService(BudgetDao budgetDao) {
        this.budgetDao = budgetDao;
    }

}
