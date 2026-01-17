package dev.faizarfi.dashboard.service;

import dev.faizarfi.dashboard.model.Lead;
import dev.faizarfi.dashboard.repository.LeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LeadService {

    @Autowired
    private LeadRepository leadRepository;


    public Lead createLead(Lead lead) {
        if (lead.getCreatedAt() == null) {
            lead.setCreatedAt(LocalDateTime.now());
            lead.setUpdatedAt(LocalDateTime.now());
        }
        // Default status if null
        if (lead.getStatus() == null) {
            lead.setStatus("NEW");
        }
        return leadRepository.save(lead);
    }

    // Get Leads with Search, Filter, Sort, and Pagination
    public Page<Lead> getLeads(String search, String status, int page, int size, String sortBy, String sortDir) {

        // Define Sorting direction (ASC or DESC)
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        // Create Pageable object (Page numbers start at 0)
        Pageable pageable = PageRequest.of(page, size, sort);

        // Call our Custom Repository Method (defined in Step 1)
        return leadRepository.findLeadsByCriteria(search, status, pageable);
    }

    public Map<String, Object> getAnalytics() {
        Map<String, Object> stats = new HashMap<>();


        long totalLeads = leadRepository.count();
        stats.put("total_leads", totalLeads);

        // Fetch all leads once for multiple metrics
        List<Lead> allLeads = leadRepository.findAll();

        // Converted Leads Count
        long convertedCount = allLeads.stream()
                .filter(l -> "CONVERTED".equalsIgnoreCase(l.getStatus()))
                .count();
        stats.put("converted_leads", convertedCount);

        // Leads by Stage
        // Returns a map like: { "NEW": 10, "CONTACTED": 5, ... }
        Map<String, Long> leadsByStage = allLeads.stream()
                .collect(Collectors.groupingBy(Lead::getStatus, Collectors.counting()));
        stats.put("leads_by_stage", leadsByStage);

        return stats;
    }
}