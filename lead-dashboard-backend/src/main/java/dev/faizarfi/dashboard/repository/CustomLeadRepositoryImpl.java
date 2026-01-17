package dev.faizarfi.dashboard.repository;

import dev.faizarfi.dashboard.model.Lead;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CustomLeadRepositoryImpl implements CustomLeadRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Page<Lead> findLeadsByCriteria(String search, String status, Pageable pageable) {
        Query query = new Query();
        List<Criteria> criteriaList = new ArrayList<>();

        // 1. Dynamic Search (Name OR Email) - Case Insensitive ("i")
        if (search != null && !search.isEmpty()) {
            Criteria searchCriteria = new Criteria().orOperator(
                    Criteria.where("name").regex(search, "i"),
                    Criteria.where("email").regex(search, "i")
            );
            criteriaList.add(searchCriteria);
        }

        // 2. Dynamic Filter (Status) - Exact Match
        if (status != null && !status.isEmpty()) {
            criteriaList.add(Criteria.where("status").is(status));
        }

        // Apply criteria if any exist
        if (!criteriaList.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        }

        // 3. Count total items (needed for Pagination info)
        long total = mongoTemplate.count(query, Lead.class);

        // 4. Apply Pagination (Page number, size, sorting)
        query.with(pageable);

        // 5. Fetch the actual list
        List<Lead> leads = mongoTemplate.find(query, Lead.class);

        return new PageImpl<>(leads, pageable, total);
    }
}