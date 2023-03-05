package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Expense;

import java.util.List;
import java.util.Optional;

public interface ExpenseDao {
    Optional<List<Expense>> getAllExpenses();

    Optional<Expense> getExpenseById(Long id);

    Optional<Expense> createExpense(Expense expense);

    Optional<Expense> updateExpense(Expense expense);

    int deleteById(Long id);

    Optional<List<Expense>> getExpensesByUserId(Long userId);
}
