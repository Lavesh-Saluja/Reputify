package com.example.demo.repository;

import com.example.demo.entity.Feedback;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedbackRepo extends JpaRepository<Feedback,String> {
    List<Feedback> findAllByOrganizationId(String orgId);

    @Modifying
    @Transactional
    @Query("UPDATE Feedback set stared=true where feedbackId= :feedId")
    void starFeedback(@Param("feedId") String feedId);

    @Modifying
    @Transactional
    @Query("UPDATE Feedback set stared=false where feedbackId= :feedId")
    void unStarFeedback(@Param("feedId") String feedId);


    List<Feedback> findAllByOrganizationIdAndStaredTrue(String orgId);
}
