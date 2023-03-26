package com.danyhry.diplomaapplication.dao;

import com.danyhry.diplomaapplication.model.Address;

import java.util.List;
import java.util.Optional;

public interface AddressDao {

    Optional<Address> createAddress(Address address);

    Optional<List<Address>> getAddressesByUserId(Long userId);

    Optional<List<Address>> getAddresses();
}
