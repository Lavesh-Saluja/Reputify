    package com.example.demo.service;

    import com.example.demo.repository.UserRepo;
    import org.springframework.beans.factory.annotation.Autowired;
    import com.example.demo.entity.User;
    import org.springframework.stereotype.Component;

    import java.util.Arrays;
    import java.util.Collections;
@Component
    public class UserService {
        @Autowired
        private UserRepo userRepo;

        public void createUser(String name,String email){
            //check if userAlready Exist dont create

            if(userRepo.existsById(email))
               return;

            User user=new User();
            user.setEmail(email);
            user.setName(name);
            user.setRoles(Collections.singletonList("USER"));
            userRepo.save(user);
            System.out.println("User created successfully.");
        }
    }
