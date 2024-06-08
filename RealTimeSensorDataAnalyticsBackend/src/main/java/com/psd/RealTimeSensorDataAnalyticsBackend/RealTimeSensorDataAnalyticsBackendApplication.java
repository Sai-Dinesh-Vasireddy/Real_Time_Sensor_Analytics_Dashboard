package com.psd.RealTimeSensorDataAnalyticsBackend;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;

import com.psd.RealTimeSensorDataAnalyticsBackend.configurations.ActiveMQMqttBeans;
import com.psd.RealTimeSensorDataAnalyticsBackend.exceptions.MqttException;
import com.psd.RealTimeSensorDataAnalyticsBackend.models.TopicsModel;
import com.psd.RealTimeSensorDataAnalyticsBackend.repository.TopicRepository;
import com.psd.RealTimeSensorDataAnalyticsBackend.utils.MiscellenousCallsPostInitofSpringApplication;
import com.psd.RealTimeSensorDataAnalyticsBackend.utils.MqttBrokerCallBacksAutoBeans;

import java.util.List;

// import com.psd.RealTimeSensorDataAnalyticsBackend.configurations.MqttConfiguration;

@SpringBootApplication
public class RealTimeSensorDataAnalyticsBackendApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = new SpringApplicationBuilder(
				RealTimeSensorDataAnalyticsBackendApplication.class)
				.run(args);

		// initiating all topics post the spring boot initalization
		MiscellenousCallsPostInitofSpringApplication.initiateAllTopics(context);

	}

}
