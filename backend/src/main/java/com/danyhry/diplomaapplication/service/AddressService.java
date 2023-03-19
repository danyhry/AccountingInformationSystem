package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.dao.AddressDao;
import com.danyhry.diplomaapplication.model.Address;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {
    private final AddressDao addressDao;

    public Address createAddress(Address address) {
        return addressDao.createAddress(address)
                .orElseThrow();
    }

    public List<Address> getAddressesByUserId(Long userId) {
        return addressDao.getAddressesByUserId(userId)
                .orElseThrow();
    }
}
