package dev.faizarfi.dashboard.repository;

import dev.faizarfi.dashboard.model.Lead;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeadRepository extends MongoRepository<Lead, String>, CustomLeadRepository {
    // This interface supports:
    // 1. repository.save(lead)
    // 2. repository.findById(id)
    // 3. repository.findLeadsByCriteria(...)
}