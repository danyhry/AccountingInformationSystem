package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Address;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class AddressDaoImpl implements AddressDao {
    private final JdbcTemplate jdbcTemplate;

    @Override
    public Optional<Address> createAddress(Address address) {
        String sql = """
                INSERT INTO address (user_id, street_address, city)
                VALUES (?, ?, ?)
                """;
        jdbcTemplate.update(sql, address.getUserId(), address.getStreetAddress(), address.getCity());

        // Get the ID of the last inserted address
        Long addressId = jdbcTemplate.queryForObject("SELECT LASTVAL()", Long.class);

        // Update the user's addressId with the new addressId
        String updateUserSql = """
            UPDATE users
            SET address_id = ?
            WHERE id = ?
            """;
        jdbcTemplate.update(updateUserSql, addressId, address.getUserId());

        // Set the addressId of the created address
        address.setId(addressId);

        return Optional.of(address);
    }

    @Override
    public Optional<List<Address>> getAddressesByUserId(Long userId) {
        String sql = "SELECT id, user_id, street_address, city FROM address WHERE user_id = ?";
        return Optional.of(jdbcTemplate.query(sql, new Object[]{userId}, new AddressRowMapper()));
    }

    @Override
    public Optional<List<Address>> getAddresses() {
        String sql = "SELECT * FROM address";
        return Optional.of(jdbcTemplate.query(sql, new AddressRowMapper()));
    }

    private static class AddressRowMapper implements RowMapper<Address> {
        @Override
        public Address mapRow(ResultSet rs, int rowNum) throws SQLException {
            Address address = new Address();
            address.setId(rs.getLong("id"));
            address.setUserId(rs.getLong("user_id"));
            address.setStreetAddress(rs.getString("street_address"));
            address.setCity(rs.getString("city"));
            return address;
        }
    }
}
