package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class User {

    @GetMapping("/hello")
    public ResponseEntity<?> welcome(@AuthenticationPrincipal OAuth2User user){
        System.out.println(user.getAttributes().keySet());
        return new ResponseEntity<>("Welcome TO Reputify", HttpStatus.OK);
    }
}
