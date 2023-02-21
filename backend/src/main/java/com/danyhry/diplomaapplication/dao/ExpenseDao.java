package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Expense;

import java.util.List;
import java.util.Optional;

public interface ExpenseDao {
    List<Expense> getAllExpenses();

    Optional<Expense> getExpenseById(Long id);

    Expense createExpense(Expense expense);

    Expense updateExpense(Expense expense);

    int deleteById(Long id);

    List<Expense> getExpensesByUserId(Long userId);
}
