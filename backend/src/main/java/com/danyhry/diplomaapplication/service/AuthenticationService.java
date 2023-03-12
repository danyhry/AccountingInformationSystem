package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.dao.UserDao;
import com.danyhry.diplomaapplication.exception.CommonException;
import com.danyhry.diplomaapplication.exception.UserAlreadyExistsException;
import com.danyhry.diplomaapplication.exception.UserException;
import com.danyhry.diplomaapplication.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        String email = registerRequest.getEmail();
        if (userDao.getUserByEmail(email).isPresent()) {
            throw new UserAlreadyExistsException(String.format("Користувач з поштою - %s вже існує", email));
        }

        User user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(new Role(1L, "USER"))
                .build();

        int result = userDao.createUser(user);

        if (result == 0) {
            throw new CommonException("Помилка при додаванні користувача в базу данних");
        }

        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .user(user)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {

        User user = userDao.getUserByEmail(authenticationRequest.getEmail())
                .orElseThrow(() -> new UserException("Користувача не знайдено"));

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));

        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .user(user)
                .build();
    }
}
