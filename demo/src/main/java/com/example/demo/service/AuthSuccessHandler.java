package com.example.demo.service;


import com.example.demo.entity.User;
import com.example.demo.repository.UserRepo;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private UserService userService;



    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        @NonNull Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        // Extract user details from OAuth2User
        String email = oAuth2User.getAttribute("email");  // You can adjust based on your OAuth2 provider
        String name = oAuth2User.getAttribute("name");

        // Check if user already exists in the database

        boolean user = userRepository.existsById(email);

    System.out.println(email+" "+name+"=========");
        if (!user) {
            System.out.println("YES");
            // If user does not exist, register the user
          userService.createUser(name,email);
        }

        // Redirect to the default success URL after registration
        response.sendRedirect("http://localhost:3000");
    }
}
