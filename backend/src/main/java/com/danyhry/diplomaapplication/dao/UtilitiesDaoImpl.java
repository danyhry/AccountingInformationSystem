package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Utility;
import com.danyhry.diplomaapplication.model.UtilityType;
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
    public Optional<Utility> saveUtility(Utility utility) {
        String sql = """
                INSERT INTO utilities (address_id, utility_type_id, previous_value, current_value, tariff)
                VALUES (?, ?, ?, ?, ?)
                """;
        jdbcTemplate.update(sql, utility.getAddressId(), utility.getUtilityTypeId(), utility.getPreviousValue(), utility.getCurrentValue(), utility.getTariff());
        return Optional.of(utility);
    }

    @Override
    public Optional<UtilityType> createUtilityType(UtilityType utilityType) {
        String query = "INSERT INTO utility_type (name) VALUES (?)";
        jdbcTemplate.update(query, utilityType.getName());
        return Optional.of(utilityType);
    }

    @Override
    public Optional<List<UtilityType>> getUtilityTypes() {
        String sql = """
                SELECT * FROM utility_type
                """;
        return Optional.of(jdbcTemplate.query(sql, (rs, rowNum) -> {
            Long id = rs.getLong("id");
            String name = rs.getString("name");
            return new UtilityType(id, name);
        }));
    }

    @Override
    public int deleteUtilityTypeById(Long id) {
        String sql = "DELETE FROM utility_type WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }


}
