package com.psd.RealTimeSensorDataAnalyticsBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.psd.RealTimeSensorDataAnalyticsBackend.models.TopicsModel;


public interface TopicRepository extends JpaRepository<TopicsModel, Long> {
    TopicsModel findByTopicName(String topicString);
    List<TopicsModel> findByGroupName(String groupString);
}