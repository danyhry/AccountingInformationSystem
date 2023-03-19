package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.dao.UtilitiesDao;
import com.danyhry.diplomaapplication.model.Utility;
import com.danyhry.diplomaapplication.model.UtilityType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UtilitiesService {
    private final UtilitiesDao utilitiesDao;

    public Utility saveUtility(Utility utilityDto) {
        Utility utility = new Utility();
        utility.setAddressId(utilityDto.getAddressId());
        utility.setUtilityTypeId(utilityDto.getUtilityTypeId());
        utility.setPreviousValue(utilityDto.getPreviousValue());
        utility.setCurrentValue(utilityDto.getCurrentValue());
        utility.setTariff(utilityDto.getTariff());

        // Calculate usage
        Long usage = utility.getCurrentValue() - utility.getPreviousValue();
        utility.setUsage(usage);

        // Calculate amountToPay
        Long amountToPay = usage * utility.getTariff();
        utility.setAmountToPay(amountToPay);

        return utilitiesDao.saveUtility(utility)
                .orElseThrow();
    }

    public void createUtilityType(UtilityType utilityType) {
        utilitiesDao.createUtilityType(utilityType)
                .orElseThrow();
    }

    public int deleteUtilityTypeById(Long id) {
        return utilitiesDao.deleteUtilityTypeById(id);
    }

    public List<UtilityType> getUtilityTypes() {
        return utilitiesDao.getUtilityTypes()
                .orElseThrow();
    }
}
