package com.psd.RealTimeSensorDataAnalyticsBackend;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;

// import com.psd.RealTimeSensorDataAnalyticsBackend.configurations.MqttConfiguration;

@SpringBootApplication
public class RealTimeSensorDataAnalyticsBackendApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = new SpringApplicationBuilder(
				RealTimeSensorDataAnalyticsBackendApplication.class)
				.run(args);
	}


}
