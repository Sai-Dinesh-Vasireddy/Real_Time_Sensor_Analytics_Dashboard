package com.psd.RealTimeSensorDataAnalyticsBackend.models;

public class DeleteSensorModel {

    private String groupName;

    private String topicName;

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }
}