package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.model.User;
import jakarta.mail.MessagingException;
import org.springframework.mail.MailException;

import java.io.UnsupportedEncodingException;
import java.util.Map;

public interface MailSenderService {

    String SYMBOLS = "1234567890qwertyuiopasdfghjklzxcvbnmQWERRTYUIOPASDFGHJKL";

    void sendEmail(String emailTo, String subject, String message);

    boolean sendEmailForRecoverPasswordPassword(User user) throws MailException;

    String generateCode();

    boolean sendMessageToAdmin(Map<String, String> contactFormValues) throws MessagingException, UnsupportedEncodingException;
}
