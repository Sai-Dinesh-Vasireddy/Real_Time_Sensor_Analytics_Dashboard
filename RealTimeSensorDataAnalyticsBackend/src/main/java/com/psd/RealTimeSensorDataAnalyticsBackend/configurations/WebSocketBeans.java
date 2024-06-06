package com.psd.RealTimeSensorDataAnalyticsBackend.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;



@Configuration
@EnableWebSocket
public class WebSocketBeans implements WebSocketConfigurer {

    @Autowired
    private WebSocketMyHandler webSocketMyHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
        registry.addHandler(webSocketMyHandler, "/topic").setAllowedOrigins("*");
    }

}