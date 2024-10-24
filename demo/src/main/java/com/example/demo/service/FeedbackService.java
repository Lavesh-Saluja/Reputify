package com.example.demo.service;

import com.example.demo.entity.Feedback;
import com.example.demo.repository.FeedbackRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class FeedbackService {
    @Autowired
    private FeedbackRepo feedbackRepo;

    public List<Feedback> getAllFeedback(String orgId){
    return feedbackRepo.findAllByOrganizationId(orgId);
    }

    public void addFeedback(Feedback feedback){
        String id=generateId();
        feedback.setFeedbackId(id);
        feedbackRepo.save(feedback);
    }
    public String generateId(){
        String uuid = UUID.randomUUID().toString();
        return "FEEDBACK_" + "_" + uuid;
    }
}
