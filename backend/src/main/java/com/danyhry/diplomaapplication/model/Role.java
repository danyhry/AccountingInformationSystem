package com.danyhry.diplomaapplication.model;

public enum Role {
    UNDEFINED,
    USER,
    ADMIN;

    public static Role convertFromLongToRole(Long number) {
        if (number == 0) {
            return UNDEFINED;
        } else if (number == 1) {
            return USER;
        }
        return ADMIN;
    }

    public static int convertFromRoleToInt(Role userRole) {
        return switch (userRole) {
            case ADMIN -> 2;
            case USER -> 1;
            case UNDEFINED, default -> 0;
        };
    }
}
