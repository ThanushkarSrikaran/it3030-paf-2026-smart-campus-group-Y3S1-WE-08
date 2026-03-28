package com.smartcampus.hub.service;

import com.smartcampus.hub.dto.ProfileUpdateRequest;
import com.smartcampus.hub.entity.User;
import com.smartcampus.hub.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ProfileService {

    private final UserRepository userRepository;

    public ProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User updateProfile(String email, ProfileUpdateRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));

        if (request.getName() != null) {
            user.setName(request.getName().trim());
        }
        if (request.getDepartment() != null) {
            user.setDepartment(request.getDepartment().trim());
        }
        if (request.getPicture() != null) {
            user.setPicture(request.getPicture().trim());
        }

        User saved = userRepository.save(user);
        log.info("Profile updated for user: {}", email);
        return saved;
    }
}
