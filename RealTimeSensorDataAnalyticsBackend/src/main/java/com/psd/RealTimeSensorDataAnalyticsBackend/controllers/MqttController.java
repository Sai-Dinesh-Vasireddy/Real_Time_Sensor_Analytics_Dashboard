// package com.psd.RealTimeSensorDataAnalyticsBackend.controllers;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RestController;

// import com.psd.RealTimeSensorDataAnalyticsBackend.models.MqttMessageModel;
// import com.psd.RealTimeSensorDataAnalyticsBackend.repository.MqttGateway;

// @RestController
// public class MqttController {

//     @Autowired
//     MqttGateway mqtGateway;


//     @PostMapping("/sendMessage")
//     public ResponseEntity<?> publish(@RequestBody MqttMessageModel mqttMessage) {

//         try {
//             mqtGateway.senToMqtt(mqttMessage.getMessage(), mqttMessage.getTopic());
//             return ResponseEntity.ok("Success");
//         } catch (Exception ex) {
//             ex.printStackTrace();
//             return ResponseEntity.ok("fail");
//         }
//     }

// }