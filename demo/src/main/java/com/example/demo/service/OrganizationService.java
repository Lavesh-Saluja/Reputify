package com.example.demo.service;

import com.example.demo.entity.Feedback;
import com.example.demo.entity.Organization;
import com.example.demo.repository.FeedbackRepo;
import com.example.demo.repository.OrganizationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class OrganizationService {
    @Autowired
    private OrganizationRepo organizationRepo;

    @Autowired
    private FeedbackRepo feedbackRepo;

    public void createOrganization(Organization org){
        String orgId=generateId(org.getOrganizationName());
        org.setOrganizationId(orgId);
        organizationRepo.save(org);
    }
    public String generateId(String name){
        String formattedName = name.toUpperCase().replaceAll(" ", "_");
        String uuid = UUID.randomUUID().toString();
        return "ORG_" + formattedName + "_" + uuid;
    }

    public List<Organization> getAllOrganizations(String email){
       // find where userEmail in orgganization is equal to email
        return organizationRepo.findAllByUserEmail(email);
    }

    public void startFeedback(String feedId) {
        feedbackRepo.starFeedback(feedId);
    }

    public void unStartFeedback(String feedId) {
        feedbackRepo.unStarFeedback(feedId);
    }

    public List<Feedback> getStaredFeedback(String orgId) {
        Organization organization = organizationRepo.findById(orgId)
                .orElseThrow(() -> new RuntimeException("Organization not found"));
        // In feedback repo find all feedback with orgId and stared vale=true
        return feedbackRepo.findAllByOrganizationIdAndStaredTrue(orgId);
    }
}
