package dev.faizarfi.dashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class LeadDashboardBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(LeadDashboardBackendApplication.class, args);
    }

}
