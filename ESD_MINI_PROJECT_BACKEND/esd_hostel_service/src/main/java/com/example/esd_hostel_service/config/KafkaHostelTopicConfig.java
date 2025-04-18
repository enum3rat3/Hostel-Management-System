package com.example.esd_hostel_service.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaHostelTopicConfig {

    @Bean
    public NewTopic HostelAllocationTopic() {
        return TopicBuilder
                .name("hostel-allocation")
                .build();
    }

    @Bean
    public NewTopic HostelVacantTopic() {
        return TopicBuilder
                .name("hostel-vacant")
                .build();
    }
}