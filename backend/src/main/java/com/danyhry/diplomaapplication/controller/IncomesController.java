package com.danyhry.diplomaapplication.controller;

import com.danyhry.diplomaapplication.model.Income;
import com.danyhry.diplomaapplication.service.IncomeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/incomes")
public class IncomesController {

    private final IncomeService incomeService;

    public IncomesController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    @GetMapping
    public ResponseEntity<List<Income>> getAllIncomes() {
        List<Income> incomes = incomeService.getAllIncomes();
        return ResponseEntity.ok(incomes);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Income>> getIncomesByUserId(@PathVariable Long userId) {
        List<Income> incomes = incomeService.getIncomesByUserId(userId);
        return ResponseEntity.ok(incomes);
    }

    @PostMapping
    public ResponseEntity<Income> createIncome(@RequestBody Income income) {
        Income createdIncome = incomeService.createIncome(income);
        return ResponseEntity.ok(createdIncome);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Income> updateIncome(@PathVariable Long id, @RequestBody Income income) {
        Income updatedIncome = incomeService.updateIncomeById(id, income);
        return ResponseEntity.ok(updatedIncome);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteIncome(@PathVariable Long id) {
        Boolean isIncomeDeleted = incomeService.deleteIncomeById(id);
        return ResponseEntity.ok(isIncomeDeleted);
    }
}
