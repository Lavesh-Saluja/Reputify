package com.example.demo.entity;

import lombok.*;
import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Feedbacks")
public class Feedback {

    @Id
    private String feedbackId;

    @NonNull
    @Column(length = 1000)
    private String description;

    private int rating; // out of 5
    private String video;

    @NonNull
    private String organizationId;

    boolean stared;

}
