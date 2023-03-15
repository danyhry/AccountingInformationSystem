package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.dao.UtilitiesDao;
import com.danyhry.diplomaapplication.model.Utilities;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UtilitiesService {
    private final UtilitiesDao utilitiesDao;

    public void saveUtility(Utilities utilities) {
        validateInputs(utilities);


        // Calculate the utility cost based on the difference between the current and previous usage
        Long usageDifference = utilities.getCurrentUsage() - utilities.getPreviousUsage();
        Long utilityCost = usageDifference * utilities.getRatePerUnit();

        // Set the amount for the current utility reading based on the utility cost
        utilities.setAmountToPay(utilityCost);

        // Save the current utility reading to the database
        utilitiesDao.saveUtility(utilities);
    }

    public List<Utilities> getUtilitiesByAddress(Long addressId) {
        return utilitiesDao.getUtilitiesByAddress(addressId)
                .orElseThrow();
    }

    public double calculateWaterUtility(Utilities utilities) {
        validateInputs(utilities);
        return utilities.getRatePerUnit() * utilities.getCurrentUsage();
    }

    public double calculateElectricityUtility(Utilities utilities) {
        validateInputs(utilities);
        return utilities.getRatePerUnit() * utilities.getCurrentUsage();
    }

    public double calculateGasUtility(Utilities utilities) {
        validateInputs(utilities);
        return utilities.getRatePerUnit() * utilities.getCurrentUsage();
    }

    public Long getPreviousUtilityValue(Long addressId, String utilityType) {
        List<Utilities> utilities = utilitiesDao.getUtilitiesByAddressAndType(addressId, utilityType)
                .orElseThrow();
        return utilities.get(utilities.size() - 1).getCurrentUsage();
    }

    public Long getRatePerUnit(Long addressId, String utilityType) {
        List<Utilities> utilities = utilitiesDao.getUtilitiesByAddressAndType(addressId, utilityType)
                .orElseThrow();
        return utilities.get(0).getRatePerUnit();
    }

    private Utilities getPreviousUtilities(Utilities utilities) {
        List<Utilities> utilitiesList = utilitiesDao.getUtilitiesByAddress(utilities.getAddressId())
                .orElseThrow();
        for (int i = utilitiesList.size() - 1; i >= 0; i--) {
            Utilities previousUtilities = utilitiesList.get(i);
            if (previousUtilities.getUtilityTypeId().equals(utilities.getUtilityTypeId())) {
                return previousUtilities;
            }
        }
        return null;
    }

    private void validateInputs(Utilities utilities) {
        if (utilities == null) {
            throw new IllegalArgumentException("Utilities object cannot be null");
        }
        if (utilities.getAddressId() == null) {
            throw new IllegalArgumentException("Address ID cannot be null");
        }
        if (utilities.getUtilityTypeId() == null) {
            throw new IllegalArgumentException("Utility type cannot be blank");
        }
        if (utilities.getRatePerUnit() <= 0) {
            throw new IllegalArgumentException("Rate per unit must be greater than zero");
        }
        if (utilities.getCurrentUsage() < 0) {
            throw new IllegalArgumentException("Usage cannot be negative");
        }
    }



}
