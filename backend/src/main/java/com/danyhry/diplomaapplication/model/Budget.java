package com.danyhry.diplomaapplication.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Budget {
    private Long id;
    private User user;
    private List<Expense> expenses;
    private List<Income> incomes;
    private Double totalExpenses;
    private Double totalIncomes;
    private List<LocalDate> incomesDate;
    private List<LocalDate> expensesDate;
}
