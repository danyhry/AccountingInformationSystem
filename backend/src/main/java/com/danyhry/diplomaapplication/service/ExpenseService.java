package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.dao.ExpenseDao;
import com.danyhry.diplomaapplication.model.Expense;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ExpenseService {
    private final ExpenseDao expenseDao;

    public ExpenseService(ExpenseDao expenseDao) {
        this.expenseDao = expenseDao;
    }

    public List<Expense> getAllExpenses() {
        return expenseDao.getAllExpenses();
    }

    public Expense createExpense(Expense income) {
        return expenseDao.createExpense(income);
    }

    public Optional<Expense> getExpenseById(Long id) {
        return expenseDao.getExpenseById(id);
    }

    public boolean deleteExpenseById(Long id) {
        int result = expenseDao.deleteById(id);
        return result != 0;
    }

    public Expense updateExpenseById(Long id, Expense income) {
        Expense existingExpense = expenseDao.getExpenseById(id)
                .orElseThrow(() -> new EntityNotFoundException("Expense with id " + id + " not found"));

        existingExpense.setDescription(income.getDescription());
        existingExpense.setAmount(income.getAmount());
        existingExpense.setDate(income.getDate());

        return expenseDao.updateExpense(existingExpense);
    }

    public List<Expense> getExpensesByUserId(Long userId) {
        return expenseDao.getExpensesByUserId(userId);
    }
}
