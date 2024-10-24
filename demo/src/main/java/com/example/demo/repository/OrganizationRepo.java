package com.example.demo.repository;

import com.example.demo.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrganizationRepo extends JpaRepository<Organization,String> {
     List<Organization> findAllByUserEmail(String email);


}

//UPDATE users
//SET name_list = append_unique(
//        name_list,
//        '{"FName4 LName4", "FName1 LName1", "FName2 LName2"}'
//)
//WHERE indexid = 'iid_123'