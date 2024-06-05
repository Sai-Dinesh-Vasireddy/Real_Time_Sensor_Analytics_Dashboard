package com.psd.RealTimeSensorDataAnalyticsBackend.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;


import com.psd.RealTimeSensorDataAnalyticsBackend.utils.WebSocketMyHandler;


// @Configuration
// @EnableWebSocketMessageBroker
// public class WebSocketBeans implements WebSocketMessageBrokerConfigurer {

//     @Override
//     public void registerStompEndpoints(StompEndpointRegistry registry){
//         registry.addEndpoint("/ws");
//         registry.addEndpoint("/ws").withSockJS();
        
//     }

//     @Override
//     public void configureMessageBroker(MessageBrokerRegistry registry){
//         // here we will listen to broker in our case its the mqtt broker
//         registry.enableSimpleBroker("/topic", "/all", "/specific");
//         registry.setApplicationDestinationPrefixes("/app");
//     }
// }


@Configuration
@EnableWebSocket
public class WebSocketBeans implements WebSocketConfigurer {

    // @Override
    // public void registerStompEndpoints(StompEndpointRegistry registry){
    //     registry.addEndpoint("/ws");
    //     registry.addEndpoint("/ws").withSockJS();
        
    // }

    // @Override
    // public void configureMessageBroker(MessageBrokerRegistry registry){
    //     // here we will listen to broker in our case its the mqtt broker
    //     registry.enableSimpleBroker("/topic", "/all", "/specific");
    //     registry.setApplicationDestinationPrefixes("/app");
    // }

    @Autowired
    private WebSocketMyHandler webSocketMyHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
        registry.addHandler(webSocketMyHandler, "/topic").setAllowedOrigins("*");
    }

}