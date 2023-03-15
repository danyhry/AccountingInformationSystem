package com.danyhry.diplomaapplication.dao.RowMappers;

import com.danyhry.diplomaapplication.model.Utilities;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UtilitiesRowMapper implements RowMapper<Utilities> {
    public Utilities mapRow(ResultSet rs, int rowNum) throws SQLException {
        return Utilities.builder()
                .id(rs.getLong("id"))
                .addressId(rs.getLong("address_id"))
                .utilityTypeId(rs.getLong("utility_type_id"))
                .ratePerUnit(rs.getLong("rate_per_unit"))
                .currentUsage(rs.getLong("current_usage"))
                .previousUsage(rs.getLong("previous_usage"))
                .amountToPay(rs.getLong("amount_to_pay"))
                .build();
    }
}
