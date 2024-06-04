package com.psd.RealTimeSensorDataAnalyticsBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.psd.RealTimeSensorDataAnalyticsBackend.models.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByUsername(String username);
}