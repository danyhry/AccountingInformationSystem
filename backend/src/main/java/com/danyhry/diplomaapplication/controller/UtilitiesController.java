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

    @PostMapping("/utilityTypes")
    public ResponseEntity<?> createUtilityType(@RequestBody UtilityType utilityType) {
        utilitiesService.createUtilityType(utilityType);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/utilityTypes")
    public ResponseEntity<List<UtilityType>> getUtilityTypes() {
        List<UtilityType> utilityTypes = utilitiesService.getUtilityTypes();
        return new ResponseEntity<>(utilityTypes, HttpStatus.OK);
    }

}
