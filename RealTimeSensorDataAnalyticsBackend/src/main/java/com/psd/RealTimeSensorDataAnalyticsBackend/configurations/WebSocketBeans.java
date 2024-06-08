package com.psd.RealTimeSensorDataAnalyticsBackend.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.psd.RealTimeSensorDataAnalyticsBackend.utils.JwtTokenUtil;

import java.util.Set;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Objects;
import java.util.List;


@Configuration
@EnableWebSocket
public class WebSocketBeans implements WebSocketHandler, WebSocketConfigurer {

    private final Set<WebSocketSession> sessions = new HashSet<>();
    private Map<String, Map<String, String>> requestedSessionInfo = new HashMap<>();

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private String getTokenFromSessionHeader(WebSocketSession session){
        String token = null;
        List<String> tokens = session.getHandshakeHeaders().getValuesAsList("Authorization");
        if(tokens.size()>0){
            token = tokens.get(0);
            Map<String, String> valueMap = new HashMap<>();
            valueMap.put("authorization", token);
            requestedSessionInfo.put(session.getId(), valueMap);
        }
        return token;
    }

    private boolean performSocketConnectionAuthorizationCheck(WebSocketSession session){
        String token = this.getTokenFromSessionHeader(session);
        if(Objects.nonNull(token)){
            String strippedToken = token.substring(7);
            return jwtTokenUtil.validateToken(strippedToken);
        }
        return false;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // work here with methods getUri,getHandshakeHeaders and form the dictionary to note the object type and to which we can send messages
        // session.getUri(); 
        //String realToken = token.substring(7);
        //boolean tokenCheckResult = jwtTokenUtil.validateToken(realToken);
        if(this.performSocketConnectionAuthorizationCheck(session)){
            sessions.add(session);
            System.out.println("Connection established on session: " + session.getId());
        } else {
            System.out.println("Connection to session " + session.getId() + " failed for not authorizing!");
            session.close();
        }
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
        // we are looping things so we can easily make segegrations and send messages
        for(WebSocketSession session : sessions){
            session.sendMessage(new TextMessage(message));
        }
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
        registry.addHandler(this, "/topic").setAllowedOrigins("*");
    }
}