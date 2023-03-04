package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.model.User;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

public interface MailSenderService {

    String SYMBOLS = "1234567890qwertyuiopasdfghjklzxcvbnmQWERRTYUIOPASDFGHJKL";

    void sendEmail(String emailTo, String subject, String message);

    boolean generateNewPassword(User user, String subject) throws NoSuchAlgorithmException;

    String generateCode();

    boolean sendMessageToAdmin(Map<String, String> contactFormValues) throws MessagingException, UnsupportedEncodingException;
}
