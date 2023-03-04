package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Income;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IncomeDao {
    List<Income> getAllIncomes();

    Optional<Income> getIncomeById(Long id);

    Income createIncome(Income income);

    Income updateIncome(Income income);

    int deleteById(Long id);

    List<Income> getIncomesByUserId(Long userId);

    List<Income> getIncomesByUserIdAndDate(Long userId, LocalDate date);
}
