package org.example.esdemailservice.notification;



import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.converter.StringJsonMessageConverter;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.HashMap;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.example.esdemailservice.notification.EmailTemplate.HOSTEL_ALLOCATION;
import static org.example.esdemailservice.notification.EmailTemplate.HOSTEL_VACANT;

@Service
@Slf4j
public class NotificationConsumer {



    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    public NotificationConsumer(JavaMailSender mailSender, SpringTemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    @Value("${spring.mail.username}")
    private String mailFrom;

    @KafkaListener(topics = "hostel-allocation")
    @Async
    public void HostelAllocationConsumer(HostelConfirmation hostelConfirmation) throws MessagingException {

//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom(mailFrom);
//        message.setTo(hostelConfirmation.student().email());
//        message.setSubject("Hostel Allocation From Spring Boot Application");
//        message.setText("Hello "+hostelConfirmation.student().studentId()+" You have been allocated room number "+hostelConfirmation.roomNumber()+" on "+ hostelConfirmation.floor() + " at "+hostelConfirmation.name()+" hostel. ");
//        mailSender.send(message);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, UTF_8.name());
        messageHelper.setFrom(mailFrom);
        messageHelper.setTo(hostelConfirmation.student().email());

        Map<String, Object> variables = new HashMap<>();
        variables.put("hostelName", hostelConfirmation.name());
        variables.put("floor", hostelConfirmation.floor());
        variables.put("roomNo", hostelConfirmation.roomNumber());
        variables.put("studentId", hostelConfirmation.student().studentId());
        Context context = new Context();
        context.setVariables(variables);

        final String templateName = HOSTEL_ALLOCATION
                .getTemplate();
        messageHelper.setSubject(HOSTEL_ALLOCATION.getSubject());


        String htmlTemplate = templateEngine.process(templateName, context);
        messageHelper.setText(htmlTemplate, true);


        mailSender.send(mimeMessage);



    }

    @KafkaListener(topics = "hostel-vacant")
    @Async
    public void HostelVacantConsumer(HostelConfirmation hostelConfirmation) throws MessagingException {
//        System.out.println(hostelConfirmation.toString());
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom(mailFrom);
//        message.setTo(hostelConfirmation.student().email());
//        message.setSubject("Hostel Vacant From Spring Boot Application");
//        message.setText("Hello "+hostelConfirmation.student().studentId()+" You have been Vacanted from  room number "+hostelConfirmation.roomNumber()+" on "+ hostelConfirmation.floor() +  " at "+hostelConfirmation.name()+" hostel. ");
//        mailSender.send(message);


        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, UTF_8.name());
        messageHelper.setFrom(mailFrom);
        messageHelper.setTo(hostelConfirmation.student().email());

        Map<String, Object> variables = new HashMap<>();
        variables.put("hostelName", hostelConfirmation.name());
        variables.put("floor", hostelConfirmation.floor());
        variables.put("roomNo", hostelConfirmation.roomNumber());
        variables.put("studentId", hostelConfirmation.student().studentId());
        Context context = new Context();
        context.setVariables(variables);


        final String templateName = HOSTEL_VACANT.getTemplate();
        messageHelper.setSubject(HOSTEL_VACANT.getSubject());


        String htmlTemplate = templateEngine.process(templateName, context);
        messageHelper.setText(htmlTemplate, true);


        mailSender.send(mimeMessage);







    }

    @Bean
    public StringJsonMessageConverter jsonConverter() {
        return new StringJsonMessageConverter();
    }
}
