package com.danyhry.diplomaapplication.service;

import com.danyhry.diplomaapplication.dao.UserDao;
import com.danyhry.diplomaapplication.exception.NotFoundException;
import com.danyhry.diplomaapplication.model.User;
import com.danyhry.diplomaapplication.utils.RegexPatterns;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Map;
import java.util.regex.Pattern;

@Slf4j
@Service
public class MailSenderServiceImpl implements MailSenderService {

    private final UserDao userDao;
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String username;

    public MailSenderServiceImpl(UserDao userDao, JavaMailSender mailSender) {
        this.userDao = userDao;
        this.mailSender = mailSender;
    }

    @Override
    public void sendEmail(String emailTo, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        log.info("username: {}", username);
        mailMessage.setFrom(username);
        mailMessage.setTo(emailTo);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        mailSender.send(mailMessage);
    }

    @Override
    public boolean generateNewPassword(User user,
                                       String subject) throws MailException {

        User userFromDb = userDao.getUserByEmail(user.getEmail())
                .orElseThrow(() -> new NotFoundException("User not found"));

        log.debug("Starting to generateNewPassword() with email={}", userFromDb.getEmail());

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String newPassword = generateCode();

        String encodedPassword = encoder.encode(newPassword);
        int result = userDao.updateUserPassword(userFromDb.getId(), encodedPassword);
        if (result != 1) {
            log.error("User`s password wasn`t updated");
            return false;
        }

        SimpleMailMessage mailMessage = new SimpleMailMessage();

        String PASSWORD_TEXT = String.format("""
                        Hello!\s
                        Unfortunately, you forgot your password.\s
                        New password is: %s
                        Otherwise, if it was not you, then just ignore this letter
                        """,
                newPassword);

        mailMessage.setFrom(username);
        mailMessage.setTo(userFromDb.getEmail());
        mailMessage.setSubject(subject);
        mailMessage.setText(PASSWORD_TEXT);

        mailSender.send(mailMessage);
        log.debug("Password was successfully recovered");
        return true;
    }

    @Override
    public String generateCode() {
        StringBuilder randString = new StringBuilder();

        for (int i = 0; i < 10; i++) {
            randString.append(SYMBOLS.charAt((int) (Math.random() * SYMBOLS.length())));
        }

        return String.valueOf(randString);
    }

    @Override
    public boolean sendMessageToAdmin(Map<String, String> contactFormValues) throws MessagingException, UnsupportedEncodingException {
        log.info("contactFormValues: {}", contactFormValues);

        String email = contactFormValues.get("email");
        String message = contactFormValues.get("message");

        if (!patternMatches(email, RegexPatterns.mailPattern) || StringUtils.isEmpty(email) || StringUtils.isEmpty(message)) {
            return false;
        }

        MimeMessage mimeMessage = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setFrom(email, email);
        helper.setTo(username);
        helper.setSubject("Support");
        helper.setText(message);

        mimeMessage.setSender(new InternetAddress(email));

        mailSender.send(mimeMessage);

        return true;
    }

    public static boolean patternMatches(String emailAddress, String regexPattern) {
        return Pattern.compile(regexPattern, Pattern.CASE_INSENSITIVE)
                .matcher(emailAddress)
                .matches();
    }
}
