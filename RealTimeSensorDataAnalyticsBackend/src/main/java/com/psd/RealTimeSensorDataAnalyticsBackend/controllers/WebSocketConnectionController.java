package com.psd.RealTimeSensorDataAnalyticsBackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Controller
public class WebSocketConnectionController {

    // mapped as /app/form
    @MessageMapping("/form")
    @SendTo("/topic")
    public String listenFromSocket(String message){
        System.out.println("Recieved "+message);
        return message;
    }

}
