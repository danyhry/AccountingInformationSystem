package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.dao.IncomeDao;
import com.danyhry.diplomaapplication.exception.NotFoundException;
import com.danyhry.diplomaapplication.model.Income;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@RunWith(MockitoJUnitRunner.class)
class IncomeServiceTest {

    @InjectMocks
    private IncomeService incomeService;

    @Mock
    private IncomeDao incomeDao;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllIncomes() {
        List<Income> expectedIncomes = new ArrayList<>();
        expectedIncomes.add(new Income(1L, 1L, 1L,"Salary", 5000L, LocalDate.now()));
        expectedIncomes.add(new Income(1L, 2L, 2L,"Bonus", 5000L, LocalDate.now()));
        when(incomeDao.getAllIncomes()).thenReturn(Optional.of(expectedIncomes));

        List<Income> actualIncomes = incomeService.getAllIncomes();

        assertEquals(expectedIncomes, actualIncomes);
    }

    @Test
    public void testGetAllIncomes_NotFoundException() {
        when(incomeDao.getAllIncomes()).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> incomeService.getAllIncomes());

        verify(incomeDao, atLeastOnce()).getAllIncomes();
    }

    @Test
    public void testCreateIncome() {
        Income income = new Income();
        when(incomeDao.createIncome(income)).thenReturn(Optional.of(income));

        Income createdIncome = incomeService.createIncome(income);

        assertNotNull(createdIncome);
        assertEquals(income, createdIncome);
        verify(incomeDao, atLeastOnce()).createIncome(income);
    }

    @Test
    public void testGetIncomeById() {
        Long incomeId = 1L;
        Income expectedIncome = new Income(incomeId, 1L, 1L,"Salary", 5000L, LocalDate.now());
        when(incomeDao.getIncomeById(incomeId)).thenReturn(Optional.of(expectedIncome));

        Income actualIncome = incomeService.getIncomeById(incomeId);

        assertEquals(expectedIncome, actualIncome);
    }

    @Test
    public void testDeleteIncomeById() {
        Long incomeId = 1L;
        when(incomeDao.deleteById(incomeId)).thenReturn(1);

        boolean result = incomeService.deleteIncomeById(incomeId);

        assertTrue(result);
    }

    @Test
    public void testDeleteIncomeByIdNotDeleted() {
        Long incomeId = 1L;
        when(incomeDao.deleteById(incomeId)).thenReturn(0);

        boolean result = incomeService.deleteIncomeById(incomeId);

        assertFalse(result);
    }

    @Test
    public void testUpdateIncomeById() {
        Long id = 1L;
        Income income = new Income();
        income.setCategoryId(2L);
        income.setDescription("Updated description");
        income.setAmount(1000L);
        income.setDate(LocalDate.now());

        Income existingIncome = new Income();
        existingIncome.setId(id);
        existingIncome.setCategoryId(1L);
        existingIncome.setDescription("Existing description");
        existingIncome.setAmount(500L);
        existingIncome.setDate(LocalDate.of(2022, 1, 1));

        when(incomeDao.getIncomeById(id)).thenReturn(Optional.of(existingIncome));
        when(incomeDao.updateIncome(any(Income.class))).thenReturn(Optional.of(existingIncome));

        Income updatedIncome = incomeService.updateIncomeById(id, income);

        assertNotNull(updatedIncome);
        assertEquals(income.getCategoryId(), updatedIncome.getCategoryId());
        assertEquals(income.getDescription(), updatedIncome.getDescription());
        assertEquals(income.getAmount(), updatedIncome.getAmount());
        assertEquals(income.getDate().plusDays(1), updatedIncome.getDate());

        verify(incomeDao, times(1)).getIncomeById(id);
        verify(incomeDao, times(1)).updateIncome(any(Income.class));
    }

    @Test
    public void testUpdateIncomeByIdWithNotFound() {
        Long id = 1L;
        Income income = new Income();
        income.setCategoryId(2L);
        income.setDescription("Updated description");
        income.setAmount(1000L);
        income.setDate(LocalDate.now());

        when(incomeDao.getIncomeById(id)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> incomeService.updateIncomeById(id, income));

        verify(incomeDao, times(1)).getIncomeById(id);
        verify(incomeDao, never()).updateIncome(any(Income.class));
    }

    @Test
    public void testUpdateIncomeByIdWithUpdateFailure() {
        Long id = 1L;
        Income income = new Income();
        income.setCategoryId(2L);
        income.setDescription("Updated description");
        income.setAmount(1000L);
        income.setDate(LocalDate.now());

        Income existingIncome = new Income();
        existingIncome.setId(id);
        existingIncome.setCategoryId(1L);
        existingIncome.setDescription("Existing description");
        existingIncome.setAmount(500L);
        existingIncome.setDate(LocalDate.of(2022, 1, 1));

        when(incomeDao.getIncomeById(id)).thenReturn(Optional.of(existingIncome));
        when(incomeDao.updateIncome(any(Income.class))).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> incomeService.updateIncomeById(id, income));


        verify(incomeDao, times(1)).getIncomeById(id);
        verify(incomeDao, times(1)).updateIncome(any(Income.class));
    }
}
