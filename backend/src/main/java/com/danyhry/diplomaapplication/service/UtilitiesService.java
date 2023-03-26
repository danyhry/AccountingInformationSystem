package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.dao.UtilitiesDao;
import com.danyhry.diplomaapplication.exception.NotFoundException;
import com.danyhry.diplomaapplication.model.Utility;
import com.danyhry.diplomaapplication.model.UtilityType;
import jakarta.persistence.EntityNotFoundException;
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
        utility.setUserId(utilityDto.getUserId());
        utility.setUtilityTypeId(utilityDto.getUtilityTypeId());

        if (utilityDto.getPreviousValue() == null) {
            utility.setPreviousValue(0L);
        } else {
            utility.setPreviousValue(utilityDto.getPreviousValue());
        }

        utility.setCurrentValue(utilityDto.getCurrentValue());

        UtilityType utilityType = getUtilityTypeById(utilityDto.getUtilityTypeId());
        utility.setTariff(utilityType.getTariff());

        // Calculate usage
        Long usage = utility.getCurrentValue() - utility.getPreviousValue();

        if (usage < 0) {
            throw new IllegalStateException("Різниця не може бути від'ємною");
        }

        utility.setUsage(usage);

        Long amountToPay = usage * utility.getTariff();
        utility.setAmountToPay(amountToPay);

        return utilitiesDao.saveUtility(utility)
                .orElseThrow();
    }

    public Utility updateUtilityById(Long id, Utility utility) {
        Utility existingUtility = utilitiesDao.getUtilityById(id)
                .orElseThrow(() -> new EntityNotFoundException("Комунальний тип з id: " + id + " не знайдено"));

        log.info("utilityEdit: {}", existingUtility);
        existingUtility.setPreviousValue(existingUtility.getCurrentValue());
        existingUtility.setCurrentValue(utility.getCurrentValue());

        UtilityType utilityType = getUtilityTypeById(existingUtility.getUtilityTypeId());
        existingUtility.setTariff(utilityType.getTariff());

        // Calculate usage
        Long usage = existingUtility.getCurrentValue() - existingUtility.getPreviousValue();

        if (usage < 0) {
            throw new IllegalStateException("Різниця не може бути від'ємною");
        }

        existingUtility.setUsage(usage);

        Long amountToPay = usage * existingUtility.getTariff();
        existingUtility.setAmountToPay(amountToPay);

        return utilitiesDao.updateUtility(existingUtility)
                .orElseThrow(() -> new IllegalStateException("Послуга не оновлена"));
    }

    public List<Utility> getUtilitiesByUserId(Long userId) {
        return utilitiesDao.getUtilitiesByUserId(userId)
                .orElseThrow();
    }

    public void deleteUtilityById(Long id) {
        utilitiesDao.deleteUtilityById(id);
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

    public UtilityType getUtilityTypeById(Long utilityTypeId) {
        return utilitiesDao.getUtilityTypeById(utilityTypeId)
                .orElseThrow(() -> new NotFoundException("Тип комунальної послуги не знайдено"));
    }

    public UtilityType updateUtilityType(UtilityType utilityType, Long id) {
        return utilitiesDao.updateUtilityType(utilityType, id)
                .orElseThrow(() -> new IllegalStateException("Тип не оновлен"));
    }

}
