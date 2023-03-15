package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.dao.RowMappers.UtilitiesRowMapper;
import com.danyhry.diplomaapplication.model.Utilities;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class UtilitiesDaoImpl implements UtilitiesDao {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void saveUtility(Utilities utilities) {
        String sql = """
                INSERT INTO utilities (address_id, utility_type_id, rate_per_unit, current_usage, previous_usage, amount_to_pay)
                VALUES (?, ?, ?, ?, ?, ?)
                """;
        jdbcTemplate.update(sql, utilities.getAddressId(), utilities.getUtilityTypeId(), utilities.getRatePerUnit(), utilities.getCurrentUsage(), utilities.getPreviousUsage(), utilities.getAmountToPay());
    }

    @Override
    public Optional<List<Utilities>> getUtilitiesByAddress(Long addressId) {
        String sql = "SELECT * FROM utilities WHERE address_id = ?";
        return Optional.of(jdbcTemplate.query(sql, new Object[]{addressId}, new UtilitiesRowMapper()));
    }

    @Override
    public Optional<List<Utilities>> getUtilitiesByAddressAndType(Long addressId, String utilityType) {
        String sql = "SELECT * FROM utilities JOIN utility_type ON utilities.utility_type_id = utility_type.id WHERE address_id = ? AND name = ?";
        return Optional.of(jdbcTemplate.query(sql, new Object[]{addressId, utilityType}, new UtilitiesRowMapper()));
    }
}
