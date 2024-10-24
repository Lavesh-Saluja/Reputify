package com.example.demo.entity;



import lombok.*;
import jakarta.persistence.*;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Organizations")
public class Organization {

    @Id
    private String organizationId;  // Primary key with auto-generation

    private String organizationName;          // Name of the organization

    @Column(length = 1000)
    private String description;   // Description of the organization

    private String logo;          // URL or path to the logo of the organization


    @NonNull
    private String userEmail;

    @Override
    public String toString(){
        return organizationName+" "+description;
    }

}
