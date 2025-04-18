package com.example.esd_hostel_service.config;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailProducer {

    private final KafkaTemplate<String, HostelConfirmation> kafkaTemplate;


    public void sendHostelAllocationService(HostelConfirmation hostelConfirmation){

        Message<HostelConfirmation> message = MessageBuilder.
                withPayload(hostelConfirmation)
                .setHeader(KafkaHeaders.TOPIC,"hostel-allocation")
                .build();
        kafkaTemplate.send(message);


    }

    public void sendHostelVacantService(HostelConfirmation hostelConfirmation){

        Message<HostelConfirmation> message = MessageBuilder.
                withPayload(hostelConfirmation)
                .setHeader(KafkaHeaders.TOPIC,"hostel-vacant")
                .build();
        kafkaTemplate.send(message);


    }

}
