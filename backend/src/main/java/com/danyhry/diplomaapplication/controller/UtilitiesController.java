package com.danyhry.diplomaapplication.controller;

import com.danyhry.diplomaapplication.model.Utilities;
import com.danyhry.diplomaapplication.service.UtilitiesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/utilities")
@RequiredArgsConstructor
public class UtilitiesController {

    private final UtilitiesService utilitiesService;

    @PostMapping
    public ResponseEntity<Void> saveUtility(@RequestBody Utilities utilities) {
        utilitiesService.saveUtility(utilities);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{addressId}")
    public ResponseEntity<List<Utilities>> getUtilitiesByAddress(@PathVariable Long addressId) {
        List<Utilities> utilitiesList = utilitiesService.getUtilitiesByAddress(addressId);
        return ResponseEntity.ok(utilitiesList);
    }

    @GetMapping("/utilities/{addressId}/{utilityType}/previous")
    public ResponseEntity<Long> getPreviousUtilityValue(@PathVariable Long addressId, @PathVariable String utilityType) {
        Long previousValue = utilitiesService.getPreviousUtilityValue(addressId, utilityType);
        if (previousValue == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(previousValue);
    }

    @GetMapping("/utilities/{addressId}/{utilityType}/calculate")
    public ResponseEntity<Long> calculateUtilityAmount(@PathVariable Long addressId, @PathVariable String utilityType, @RequestParam("currentUsage") Long currentUsage) {
        Long previousValue = utilitiesService.getPreviousUtilityValue(addressId, utilityType);
        if (previousValue == null) {
            return ResponseEntity.notFound().build();
        }
        Long ratePerUnit = utilitiesService.getRatePerUnit(addressId, utilityType);
        Long usageDifference = currentUsage - previousValue;
        Long amount = ratePerUnit * usageDifference;
        return ResponseEntity.ok(amount);
    }

    @GetMapping("/water")
    public ResponseEntity<Double> calculateWaterUtility(@RequestBody Utilities utilities) {
        double waterUtilityAmount = utilitiesService.calculateWaterUtility(utilities);
        return ResponseEntity.ok(waterUtilityAmount);
    }

    @GetMapping("/electricity")
    public ResponseEntity<Double> calculateElectricityUtility(@RequestBody Utilities utilities) {
        double electricityUtilityAmount = utilitiesService.calculateElectricityUtility(utilities);
        return ResponseEntity.ok(electricityUtilityAmount);
    }

    @GetMapping("/gas")
    public ResponseEntity<Double> calculateGasUtility(@RequestBody Utilities utilities) {
        double gasUtilityAmount = utilitiesService.calculateGasUtility(utilities);
        return ResponseEntity.ok(gasUtilityAmount);
    }
}
