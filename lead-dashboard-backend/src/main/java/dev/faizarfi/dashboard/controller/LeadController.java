package dev.faizarfi.dashboard.controller;

import dev.faizarfi.dashboard.model.Lead;
import dev.faizarfi.dashboard.service.LeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "*") // Allows your React App to talk to this API
public class LeadController {

    @Autowired
    private LeadService leadService;

    // GET Endpoint: Fetch Leads with Search, Filter, Sort, & Pagination
    // URL Example: /api/leads?search=john&status=NEW&page=0&size=10
    @GetMapping
    public ResponseEntity<Page<Lead>> getLeads(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Page<Lead> leads = leadService.getLeads(search, status, page, size, sortBy, sortDir);
        return ResponseEntity.ok(leads);
    }

    // GET Endpoint: Analytics Metrics
    // URL: /api/leads/analytics
    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        return ResponseEntity.ok(leadService.getAnalytics());
    }

    // POST Endpoint: Create a new Lead manually
    // URL: /api/leads
    @PostMapping
    public ResponseEntity<Lead> createLead(@RequestBody Lead lead) {
        return ResponseEntity.ok(leadService.createLead(lead));
    }
}