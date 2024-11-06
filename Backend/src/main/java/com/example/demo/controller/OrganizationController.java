package com.example.demo.controller;

import com.example.demo.entity.Organization;
import com.example.demo.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Component
@RestController
@RequestMapping("/organization")
public class OrganizationController {
    @Autowired
    private OrganizationService organizationService;
    @PostMapping("/create")
    public ResponseEntity<?> createOrganization(@RequestBody Organization org,@AuthenticationPrincipal OAuth2User user){
        try{
            Map<String,Object> map=user.getAttributes();
            String email= (String) map.get("email");
            org.setUserEmail(email);
            organizationService.createOrganization(org);
            System.out.println(org);

        }catch(Exception e){
            return new ResponseEntity<>("Internat Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>("Success",HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAllOrganizations(@AuthenticationPrincipal OAuth2User user){
        try{
            Map<String,Object> map=user.getAttributes();
            String email= (String) map.get("email");
            List<Organization> list=organizationService.getAllOrganizations(email);
            return new ResponseEntity<>(list,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Internat Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
