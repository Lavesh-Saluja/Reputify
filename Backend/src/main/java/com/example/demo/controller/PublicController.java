package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/public")
public class PublicController {
@GetMapping("/verify")
public ResponseEntity<?> verifyUser(){
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication.getPrincipal() instanceof OAuth2User oauth2User) {
        System.out.println(oauth2User);
        String name = oauth2User.getAttribute("name");
        String email = oauth2User.getAttribute("email");
        System.out.println("User name: " + name);
        System.out.println("User email: " + email);
        return new ResponseEntity<>("true",HttpStatus.OK);
    }
    return new ResponseEntity<>("false",HttpStatus.UNAUTHORIZED);
}

}
