// package com.psd.RealTimeSensorDataAnalyticsBackend.controllers;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.integration.mqtt.outbound.MqttPahoMessageHandler;
// import org.springframework.messaging.Message;
// import org.springframework.messaging.MessageChannel;
// import org.springframework.messaging.support.MessageBuilder;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// @RequestMapping("/mqtt")
// public class MqttController {

//     private final MessageChannel mqttOutputChannel;
//     private final MqttPahoMessageHandler mqttHandler;

//     @Autowired
//     public MqttController(MessageChannel mqttOutputChannel, MqttPahoMessageHandler mqttHandler) {
//         this.mqttOutputChannel = mqttOutputChannel;
//         this.mqttHandler = mqttHandler;
//     }

//     @GetMapping("/publish/{topic}/{message}")
//     public String publishMessage(@PathVariable String topic, @PathVariable String message) {
//         Message<String> mqttMessage = MessageBuilder.withPayload(message).setHeader("mqtt_topic", topic).build();
//         mqttOutputChannel.send(mqttMessage);
//         return "Message published to topic: " + topic;
//     }

//     @GetMapping("/subscribe/{topic}")
//     public String subscribeToTopic(@PathVariable String topic) {
//         mqttHandler.addTopic(topic);
//         return "Subscribed to topic: " + topic;
//     }

//     @GetMapping("/unsubscribe/{topic}")
//     public String unsubscribeFromTopic(@PathVariable String topic) {
//         mqttHandler.removeTopic(topic);
//         return "Unsubscribed from topic: " + topic;
//     }
// }
