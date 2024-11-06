package com.example.demo.config;
import lombok.NonNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.stream.Stream;

@Configuration
@EnableWebMvc
public class Cors implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        CorsRegistration corsRegistration = registry.addMapping("/**");
        corsRegistration.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
        corsRegistration.allowedHeaders("Authorization", "Requestor-Type", "Content-Type");
        corsRegistration.exposedHeaders("Content-Disposition"); // file download filename header

        String[] allowedOriginPatternsArray = {"http://localhost:3000"};

        corsRegistration.allowedOriginPatterns(allowedOriginPatternsArray);
    }
}