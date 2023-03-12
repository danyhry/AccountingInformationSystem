package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.dao.IncomeDao;
import com.danyhry.diplomaapplication.exception.NotFoundException;
import com.danyhry.diplomaapplication.model.Income;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
public class IncomeService {

    private final IncomeDao incomeDao;

    public IncomeService(IncomeDao incomeDao) {
        this.incomeDao = incomeDao;
    }

    public List<Income> getAllIncomes() {
        return incomeDao.getAllIncomes()
                .orElseThrow(() -> new NotFoundException("Доходи не знайдено"));
    }

    public Income createIncome(Income income) {
//        income.setDate(income.getDate().plusDays(1));
        return incomeDao.createIncome(income)
                .orElseThrow(() -> new NotFoundException("Дохід не створений"));
    }

    public Income getIncomeById(Long id) {
        return incomeDao.getIncomeById(id)
                .orElseThrow(() -> new NotFoundException("Дохід не знайдено"));
    }

    public boolean deleteIncomeById(Long id) {
        int result = incomeDao.deleteById(id);
        return result != 0;
    }

    public Income updateIncomeById(Long id, Income income) {
        Income existingIncome = incomeDao.getIncomeById(id)
                .orElseThrow(() -> new EntityNotFoundException("Дохід з id: " + id + " не знайдено"));

        existingIncome.setCategoryId(income.getCategoryId());
        existingIncome.setDescription(income.getDescription());
        existingIncome.setAmount(income.getAmount());
        existingIncome.setDate(income.getDate().plusDays(1));

        return incomeDao.updateIncome(existingIncome)
                .orElseThrow(() -> new NotFoundException("Дохід не оновлений"));
    }

    public List<Income> getIncomesByUserId(Long userId) {
        return this.incomeDao.getIncomesByUserId(userId)
                .orElseThrow(() -> new NotFoundException("Доходи не знайдено"));
    }

    public List<Income> getIncomesByUserIdAndDate(Long userId, LocalDate date) {
        return incomeDao.getIncomesByUserIdAndDate(userId, date)
                .orElseThrow(() -> new NotFoundException("Доходи не знайдено"));
    }
}
