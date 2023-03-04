package com.danyhry.diplomaapplication.controller;

import com.danyhry.diplomaapplication.service.BudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/budget")
public class BudgetController {

    private final BudgetService budgetService;

}
