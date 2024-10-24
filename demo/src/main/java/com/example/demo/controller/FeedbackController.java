package com.example.demo.controller;


import com.example.demo.entity.Feedback;
import com.example.demo.entity.Organization;
import com.example.demo.repository.FeedbackRepo;
import com.example.demo.repository.OrganizationRepo;
import com.example.demo.service.FeedbackService;
import com.example.demo.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private OrganizationRepo organizationRepo;

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private FeedbackRepo feedbackRepo;

    @PostMapping("/add")
    public ResponseEntity<?> addFeedBack(@RequestBody Feedback feedback){
    try{
        Optional<Organization> organizationOptional = organizationRepo.findById(feedback.getOrganizationId());

        if (organizationOptional.isPresent() && feedback.getRating()>0) {
            feedbackService.addFeedback(feedback);
            return new ResponseEntity<>("Feedback added successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Input Error", HttpStatus.NOT_FOUND);
        }
    }catch (Exception e){
        return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }

    @GetMapping("{orgId}")
    public ResponseEntity<?> getAllFeedbacks(@PathVariable String orgId){
        try{
            // check if organization exist if not send No org found
            // else send all its feedback
            System.out.println(orgId+"=======");
            Optional<Organization> org=organizationRepo.findById(orgId);
            if(org.isEmpty())
                return new ResponseEntity<>("Organization Not found",HttpStatus.NOT_FOUND);
            List<Feedback> list=feedbackService.getAllFeedback(orgId);
            return new ResponseEntity<>(list,HttpStatus.OK);

        }catch (Exception e){
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/starFeedback/{feedId}")
    public ResponseEntity<?> starFeedback(@PathVariable String feedId){
    try{
        System.out.println(feedId+"1=======");
        Optional<Feedback> feed=feedbackRepo.findById(feedId);
        if(feed.isEmpty())
            return new ResponseEntity<>("Feed Not found",HttpStatus.NOT_FOUND);
        // extract organizationId
        System.out.println(feedId+"2=======");
        System.out.println(feedId+"3=======");
        organizationService.startFeedback(feedId);
        System.out.println(feedId+"4=======");
        return new ResponseEntity<>("Success",HttpStatus.OK);
    } catch (Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }

    @PutMapping("/unstar/{feedId}")
    public ResponseEntity<?> unStarFeedback(@PathVariable String feedId){
        try{
            System.out.println(feedId+"=======");
            Optional<Feedback> feed=feedbackRepo.findById(feedId);
            if(feed.isEmpty())
                return new ResponseEntity<>("Feed Not found",HttpStatus.NOT_FOUND);
            // extract organizationId
            organizationService.unStartFeedback(feedId);
            return new ResponseEntity<>("Success",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/stared/{orgId}")
    public ResponseEntity<?> getStaredFeedback(@PathVariable String orgId){
        try{
            System.out.println(orgId+"=======");
            Optional<Organization> organization=organizationRepo.findById(orgId);
            if(organization.isEmpty())
                return new ResponseEntity<>("Feed Not found",HttpStatus.NOT_FOUND);
            // extract organizationId
            List<Feedback> feeds=organizationService.getStaredFeedback(orgId);
            return new ResponseEntity<>(feeds,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
