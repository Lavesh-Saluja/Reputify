package com.example.demo.entity;


import lombok.*;

import jakarta.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Users")
public class User {

    @Id
    private String email;
    @NonNull
    private String name;
    @ElementCollection
    private List<String> roles;
}
