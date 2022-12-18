package com.example.backend.common.utils;

import com.example.backend.exception.EmailException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailUtils {
    private final JavaMailSender mailSender;
    @Value("${spring.mail.username}") private String sender;
    public void sendEmailInviteToRoom(String description, String email, String title) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setText(description);
            mailMessage.setTo(email);
            mailMessage.setSubject(title);
            mailSender.send(mailMessage);
        } catch (Exception e) {
            throw new EmailException(e.getMessage());
        }
    }

}
