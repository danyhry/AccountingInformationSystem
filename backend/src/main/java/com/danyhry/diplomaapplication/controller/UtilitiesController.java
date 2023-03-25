package com.danyhry.diplomaapplication.controller;

import com.danyhry.diplomaapplication.model.Utility;
import com.danyhry.diplomaapplication.model.UtilityType;
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
    public ResponseEntity<Utility> createUtility(@RequestBody Utility utility) {
        Utility utilityResponse = utilitiesService.saveUtility(utility);
        return ResponseEntity.ok(utilityResponse);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Utility>> getUtilitiesByUserId(@PathVariable Long userId) {
        List<Utility> utilities = utilitiesService.getUtilitiesByUserId(userId);
        return new ResponseEntity<>(utilities, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void deleteUtilityTById(@PathVariable Long id) {
        utilitiesService.deleteUtilityById(id);
    }

    @PostMapping("/utilityTypes")
    public ResponseEntity<?> createUtilityType(@RequestBody UtilityType utilityType) {
        utilitiesService.createUtilityType(utilityType);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/utilityTypes/{id}")
    public ResponseEntity<?> updateUtilityType(@RequestBody UtilityType utilityType, @PathVariable Long id) {
        utilitiesService.updateUtilityType(utilityType, id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/utilityTypes")
    public ResponseEntity<List<UtilityType>> getUtilityTypes() {
        List<UtilityType> utilityTypes = utilitiesService.getUtilityTypes();
        return new ResponseEntity<>(utilityTypes, HttpStatus.OK);
    }

    @DeleteMapping("/utilityTypes/{id}")
    public void deleteUtilityTypeById(@PathVariable Long id) {
        utilitiesService.deleteUtilityTypeById(id);
    }

}
