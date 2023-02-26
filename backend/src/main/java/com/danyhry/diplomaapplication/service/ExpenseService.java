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

    public Expense createExpense(Expense expense) {
        expense.setDate(expense.getDate().plusDays(1));
        return expenseDao.createExpense(expense);
    }

    public Optional<Expense> getExpenseById(Long id) {
        return expenseDao.getExpenseById(id);
    }

    public boolean deleteExpenseById(Long id) {
        int result = expenseDao.deleteById(id);
        return result != 0;
    }

    public Expense updateExpenseById(Long id, Expense expense) {
        Expense existingExpense = expenseDao.getExpenseById(id)
                .orElseThrow(() -> new EntityNotFoundException("Expense with id " + id + " not found"));

        existingExpense.setCategoryId(expense.getCategoryId());
        existingExpense.setDescription(expense.getDescription());
        existingExpense.setAmount(expense.getAmount());
        existingExpense.setDate(expense.getDate().plusDays(1));

        return expenseDao.updateExpense(existingExpense);
    }

    public List<Expense> getExpensesByUserId(Long userId) {
        return expenseDao.getExpensesByUserId(userId);
    }
}
