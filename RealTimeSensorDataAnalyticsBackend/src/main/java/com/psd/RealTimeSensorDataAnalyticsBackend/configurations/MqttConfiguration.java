// package com.psd.RealTimeSensorDataAnalyticsBackend.configurations;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.integration.channel.DirectChannel;
// import org.springframework.integration.dsl.MessageChannels;
// import org.springframework.integration.mqtt.outbound.MqttPahoMessageHandler;
// import org.springframework.messaging.MessageChannel;
// import org.springframework.messaging.MessageHandler;
// import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;


// @Configuration
// public class MqttConfiguration {

//     @Bean
//     public MessageChannel mqttOutputChannel() {
//         return MessageChannels.direct().get();
//     }

//     @Bean
//     public MessageHandler mqttOutbound() {
//         MqttPahoMessageHandler messageHandler = new MqttPahoMessageHandler("tcp://localhost:1883", "lax");
//         messageHandler.setAsync(true);
//         messageHandler.setDefaultQos(1);
//         return messageHandler;
//     }

//     // Define an input channel for incoming messages
//     @Bean
//     public MessageChannel mqttInputChannel() {
//         return MessageChannels.direct().get();
//     }

//     // Define a message-driven channel adapter to consume messages from a topic
//     @Bean
//     public MqttPahoMessageDrivenChannelAdapter mqttInbound() {
//         MqttPahoMessageDrivenChannelAdapter adapter =
//                 new MqttPahoMessageDrivenChannelAdapter("lax", "tcp://localhost:1883", "topic");
//         adapter.setOutputChannel(mqttInputChannel());
//         return adapter;
//     }

// }

