package com.psd.RealTimeSensorDataAnalyticsBackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Controller
public class WebSocketConnectionController {
    
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/form")
    @SendTo("topic/greetings")
    public String listenFromSocket(String message){
        return "Recieved "+message;
    }

}
