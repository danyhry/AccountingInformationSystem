package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Income;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IncomeDao {
    Optional<List<Income>> getAllIncomes();

    Optional<Income> getIncomeById(Long id);

    Optional<Income> createIncome(Income income);

    Optional<Income> updateIncome(Income income);

    int deleteById(Long id);

    Optional<List<Income>> getIncomesByUserId(Long userId);

    Optional<List<Income>> getIncomesByUserIdAndDate(Long userId, LocalDate date);
}
