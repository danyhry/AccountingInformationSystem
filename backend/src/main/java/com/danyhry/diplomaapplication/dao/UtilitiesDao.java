package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Utilities;

import java.util.List;
import java.util.Optional;

public interface UtilitiesDao {
    void saveUtility(Utilities utilities);

    Optional<List<Utilities>> getUtilitiesByAddress(Long addressId);

    Optional<List<Utilities>> getUtilitiesByAddressAndType(Long addressId, String utilityType);
}
