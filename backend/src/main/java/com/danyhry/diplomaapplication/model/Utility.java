package com.danyhry.diplomaapplication.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Utility {
    private Long id;
    private Long addressId;
    private Long utilityTypeId; // e.g. water, gas, electricity
    private Long previousValue;
    private Long currentValue;
    private Long tariff;
    private Long usage;
    private Long amountToPay;
}
