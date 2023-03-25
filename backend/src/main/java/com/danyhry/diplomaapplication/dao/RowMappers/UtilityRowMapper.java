package com.danyhry.diplomaapplication.dao.RowMappers;

import com.danyhry.diplomaapplication.model.Utility;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

@Slf4j
public class UtilityRowMapper implements RowMapper<Utility> {
    @Override
    public Utility mapRow(ResultSet rs, int rowNum) throws SQLException {
        Utility utility = new Utility();
        utility.setId(rs.getLong("id"));
        utility.setAddressId(rs.getLong("address_id"));
        utility.setUserId(rs.getLong("user_id"));
        utility.setUtilityTypeId(rs.getLong("utility_type_id"));
        utility.setPreviousValue(rs.getLong("previous_value"));
        utility.setCurrentValue(rs.getLong("current_value"));
        utility.setUsage(rs.getLong("usage"));
        utility.setTariff(rs.getLong("tariff"));
        utility.setAmountToPay(rs.getLong("amount_to_pay"));

        log.info("utility: {}", utility);
        return utility;
    }
}
