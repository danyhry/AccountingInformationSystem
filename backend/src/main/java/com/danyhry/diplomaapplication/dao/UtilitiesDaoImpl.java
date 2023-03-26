package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.dao.RowMappers.UtilityRowMapper;
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
                INSERT INTO utilities (address_id, user_id, utility_type_id, previous_value, current_value, tariff, usage, amount_to_pay)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """;
        jdbcTemplate.update(sql,
                utility.getAddressId(),
                utility.getUserId(),
                utility.getUtilityTypeId(),
                utility.getPreviousValue(),
                utility.getCurrentValue(),
                utility.getTariff(),
                utility.getUsage(),
                utility.getAmountToPay()
        );
        return Optional.of(utility);
    }

    @Override
    public Optional<Utility> updateUtility(Utility existingUtility) {
        String sql = """
                UPDATE utilities
                SET previous_value = ?, current_value = ?, tariff = ?, usage = ?, amount_to_pay = ?
                WHERE id = ?
                """;
        jdbcTemplate.update(sql,
                existingUtility.getPreviousValue(),
                existingUtility.getCurrentValue(),
                existingUtility.getTariff(),
                existingUtility.getUsage(),
                existingUtility.getAmountToPay(),
                existingUtility.getId()
        );
        return Optional.of(existingUtility);
    }

    @Override
    public Optional<Utility> getUtilityById(Long id) {
        String sql = """
                SELECT * FROM utilities
                WHERE id = ?
                """;
        return jdbcTemplate.query(sql, new UtilityRowMapper(), id)
                .stream()
                .findFirst();
    }

    @Override
    public Optional<List<Utility>> getUtilitiesByUserId(Long userId) {
        String sql = """
                SELECT * FROM utilities
                WHERE user_id = ?
                """;
        return Optional.of(jdbcTemplate.query(sql, new UtilityRowMapper(), userId));
    }

    @Override
    public Optional<UtilityType> createUtilityType(UtilityType utilityType) {
        String query = "INSERT INTO utility_type (name, tariff) VALUES (?, ?)";
        jdbcTemplate.update(query, utilityType.getName(), utilityType.getTariff());
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
            Long tariff = rs.getLong("tariff");
            return new UtilityType(id, name, tariff);
        }));
    }

    @Override
    public int deleteUtilityTypeById(Long id) {
        String sql = "DELETE FROM utility_type WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    @Override
    public Optional<UtilityType> getUtilityTypeById(Long utilityId) {
        String sql = """
                SELECT * FROM utility_type
                WHERE id = ?
                """;
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
                    Long id = rs.getLong("id");
                    String name = rs.getString("name");
                    Long tariff = rs.getLong("tariff");
                    return new UtilityType(id, name, tariff);
                }, utilityId)
                .stream()
                .findFirst();
    }

    @Override
    public Optional<UtilityType> updateUtilityType(UtilityType utilityType, Long id) {
        String sql = """
                UPDATE utility_type
                SET name = ?, tariff = ? WHERE id = ?
                """;
        jdbcTemplate.update(sql, utilityType.getName(), utilityType.getTariff(), id);
        return Optional.of(utilityType);
    }

    @Override
    public int deleteUtilityById(Long id) {
        String sql = "DELETE FROM utilities WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }


}
