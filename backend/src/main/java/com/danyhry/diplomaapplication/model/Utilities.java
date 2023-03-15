package com.danyhry.diplomaapplication.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Utilities {
    private Long id;
    private Long addressId;
    private Long utilityTypeId; // e.g. water, gas, electricity
    private Long ratePerUnit;
    private Long currentUsage;
    private Long previousUsage;
    private Long amountToPay;
}
