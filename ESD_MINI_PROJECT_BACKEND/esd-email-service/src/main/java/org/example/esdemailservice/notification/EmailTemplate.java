package org.example.esdemailservice.notification;

import lombok.Getter;

public enum EmailTemplate {

    HOSTEL_ALLOCATION("hostel-allocation.html", "Hostel Allocation"),
    HOSTEL_VACANT("hostel-vacant.html", "Hostel Vacant"),
    ;

    @Getter
    private final String template;
    @Getter
    private final String subject;


    EmailTemplate(String template, String subject) {
        this.template = template;
        this.subject = subject;
    }
}