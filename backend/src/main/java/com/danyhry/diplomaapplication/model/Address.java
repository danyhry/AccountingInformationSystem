package com.danyhry.diplomaapplication.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Address {
    private Long id;
    private Long userId;
    private String streetAddress;
    private String city;
    private String state;
    private String zipCode;
}
