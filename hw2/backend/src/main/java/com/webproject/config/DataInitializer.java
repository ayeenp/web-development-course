package com.webproject.config;

import com.webproject.model.User;
import com.webproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Pre-populate with some users if they don't exist
        if (!userRepository.existsByUsername("alice")) {
            User alice = new User("alice", "password123");
            userRepository.save(alice);
        }
        
        if (!userRepository.existsByUsername("bob")) {
            User bob = new User("bob", "password123");
            userRepository.save(bob);
        }
        
        if (!userRepository.existsByUsername("charlie")) {
            User charlie = new User("charlie", "password123");
            userRepository.save(charlie);
        }
        
        if (!userRepository.existsByUsername("david")) {
            User david = new User("david", "password123");
            userRepository.save(david);
        }
        
        if (!userRepository.existsByUsername("emma")) {
            User emma = new User("emma", "password123");
            userRepository.save(emma);
        }
        
        System.out.println("Database initialized with predefined users: alice, bob, charlie, david, emma");
        System.out.println("All users have password: password123");
    }
} 