package dev.faizarfi.dashboard.config;

import dev.faizarfi.dashboard.model.Lead;
import dev.faizarfi.dashboard.repository.LeadRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private LeadRepository leadRepository;

    @Override
    public void run(String... args) throws Exception {

        if (leadRepository.count() > 0) {
            System.out.println("Database already seeded. Skipping data generation.");
            return;
        }

        System.out.println("Seeding database with 500 dummy leads...");


        List<String> statuses = Arrays.asList("NEW", "CONTACTED", "QUALIFIED", "LOST", "CONVERTED");
        List<String> sources = Arrays.asList("WEBSITE", "LINKEDIN", "REFERRAL", "COLD_CALL", "ADS");
        Random random = new Random();
        List<Lead> leadsToSave = new ArrayList<>();


        for (int i = 1; i <= 500; i++) {
            Lead lead = new Lead();
            lead.setName("Lead Client " + i);
            lead.setEmail("lead" + i + "@example.com"); // Unique emails
            lead.setPhone("555-010-" + String.format("%03d", i));


            lead.setStatus(statuses.get(random.nextInt(statuses.size())));
            lead.setSource(sources.get(random.nextInt(sources.size())));


            double value = 1000 + (10000 - 1000) * random.nextDouble();
            lead.setValue(Math.round(value * 100.0) / 100.0); // Round to 2 decimals


            LocalDateTime date = LocalDateTime.now().minusDays(random.nextInt(60));
            lead.setCreatedAt(date);
            lead.setUpdatedAt(date);

            leadsToSave.add(lead);
        }


        leadRepository.saveAll(leadsToSave);

        System.out.println("Database successfully seeded with 500 leads!");
    }
}