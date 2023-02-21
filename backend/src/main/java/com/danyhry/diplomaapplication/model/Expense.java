package com.danyhry.diplomaapplication.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Expense {
    private Long id;
    private Long userId;
    private String description;
    private Long amount;
    private LocalDate date;
}
