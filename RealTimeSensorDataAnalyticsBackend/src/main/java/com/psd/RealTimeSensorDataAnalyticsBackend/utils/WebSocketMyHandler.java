package com.psd.RealTimeSensorDataAnalyticsBackend.utils;

import java.util.HashSet;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.Set;
import java.util.HashSet;


@Component
public class WebSocketMyHandler implements WebSocketHandler {

    private final Set<WebSocketSession> sessions = new HashSet<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("Connection established on session: " + session.getId());
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String gameId = (String) message.getPayload();
        session.sendMessage(new TextMessage("Started processing game: " + gameId));
        Thread.sleep(1000);
        session.sendMessage(new TextMessage("Completed processing game: " + gameId));
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        System.out.println("Exception occured: {} on session: {}" + exception.getMessage() + session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        System.out.println("Connection closed on session: {} with status: {}" + session.getId() + closeStatus.getCode());
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    // Method to send a message to the connected clients
    public void sendMessageToClients(String message) throws Exception {
        for(WebSocketSession session : sessions){
            session.sendMessage(new TextMessage(message));
        }
    }
}