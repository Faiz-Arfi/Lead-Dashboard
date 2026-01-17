package dev.faizarfi.dashboard.repository;

import dev.faizarfi.dashboard.model.Lead;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomLeadRepository {
    // Defines custom method signature
    Page<Lead> findLeadsByCriteria(String search, String status, Pageable pageable);
}