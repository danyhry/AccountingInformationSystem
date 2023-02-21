package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.dao.IncomeDao;
import com.danyhry.diplomaapplication.model.Income;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class IncomeService {

    private final IncomeDao incomeDao;

    public IncomeService(IncomeDao incomeDao) {
        this.incomeDao = incomeDao;
    }

    public List<Income> getAllIncomes() {
        return incomeDao.getAllIncomes();
    }

    public Income createIncome(Income income) {
        return incomeDao.createIncome(income);
    }

    public Optional<Income> getIncomeById(Long id) {
        return incomeDao.getIncomeById(id);
    }

    public boolean deleteIncomeById(Long id) {
        int result = incomeDao.deleteById(id);
        return result != 0;
    }

    public Income updateIncomeById(Long id, Income income) {
        Income existingIncome = incomeDao.getIncomeById(id)
                .orElseThrow(() -> new EntityNotFoundException("Income with id " + id + " not found"));

        existingIncome.setDescription(income.getDescription());
        existingIncome.setAmount(income.getAmount());
        existingIncome.setDate(income.getDate());

        return incomeDao.updateIncome(existingIncome);
    }
}
