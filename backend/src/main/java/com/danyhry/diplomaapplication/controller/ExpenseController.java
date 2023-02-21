package com.danyhry.diplomaapplication.controller;

import com.danyhry.diplomaapplication.model.Expense;
import com.danyhry.diplomaapplication.service.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {
    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        List<Expense> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/expense")
    public ResponseEntity<List<Expense>> getExpensesByUserId(@RequestParam Long userId) {
        List<Expense> expenses = expenseService.getExpensesByUserId(userId);
        return ResponseEntity.ok(expenses);
    }

    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {
        Expense createdExpense = expenseService.createExpense(expense);
        return ResponseEntity.ok(createdExpense);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpenseById(@PathVariable Long id, @RequestBody Expense expense) {
        Expense updateExpense = expenseService.updateExpenseById(id, expense);
        return ResponseEntity.ok(updateExpense);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteExpenseById(@PathVariable Long id) {
        Boolean isExpenseDeleted = expenseService.deleteExpenseById(id);
        return ResponseEntity.ok(isExpenseDeleted);
    }
}
