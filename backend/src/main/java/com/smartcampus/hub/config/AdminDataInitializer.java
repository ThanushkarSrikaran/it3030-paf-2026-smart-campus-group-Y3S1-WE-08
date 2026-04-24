package com.smartcampus.hub.config;

import com.smartcampus.hub.entity.User;
import com.smartcampus.hub.enums.Role;
import com.smartcampus.hub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Slf4j
@Component
@Order(1)
@RequiredArgsConstructor
public class AdminDataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        boolean adminExists = userRepository.existsByRolesContaining(Role.ADMIN);
        if (adminExists) {
            log.info("Admin user already exists — skipping.");
            return;
        }

        User admin = User.builder()
                .name("System Admin")
                .email("admin@smartcampus.edu")
                .password(passwordEncoder.encode("admin123"))
                .active(true)
                .roles(Set.of(Role.ADMIN))
                .build();

        userRepository.save(admin);
        log.info("Default admin created → email: admin@smartcampus.edu | password: admin123");
    }
}
