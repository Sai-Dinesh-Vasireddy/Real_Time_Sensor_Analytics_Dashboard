package com.psd.RealTimeSensorDataAnalyticsBackend.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "MQTT_Topics",uniqueConstraints = {@UniqueConstraint(columnNames = {"topicName", "groupName"})})
public class TopicsModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String topicName;

    private String groupName;

    private String machineName;

}