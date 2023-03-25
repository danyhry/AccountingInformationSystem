package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Utility;
import com.danyhry.diplomaapplication.model.UtilityType;

import java.util.List;
import java.util.Optional;

public interface UtilitiesDao {
    Optional<Utility> saveUtility(Utility utilities);

    Optional<List<Utility>> getUtilitiesByUserId(Long userId);

    Optional<UtilityType> createUtilityType(UtilityType utilityType);

    Optional<List<UtilityType>> getUtilityTypes();

    int deleteUtilityTypeById(Long id);

    Optional<UtilityType> getUtilityTypeById(Long id);

    Optional<UtilityType> updateUtilityType(UtilityType utilityType, Long id);

    int deleteUtilityById(Long id);
}
