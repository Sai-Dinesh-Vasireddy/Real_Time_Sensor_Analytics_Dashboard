package com.psd.RealTimeSensorDataAnalyticsBackend.configurations;

import java.util.Objects;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class MqttBrokerCallBacksAutoBeans implements MqttCallback {

    @Autowired
    private WebSocketMyHandler mqttWebSocketHandler;


    public MqttBrokerCallBacksAutoBeans() {
        try{
            IMqttClient mqttClient = ActiveMQMqttBeans.getInstance();
            mqttClient.setCallback(this);
            mqttClient.subscribe("testTopic");
        } catch (MqttException exception){
            exception.printStackTrace();
        }
    }

    @Override
    public void connectionLost(Throwable cause){
        System.out.println("Connection to MQTT Broker Lost!!");
    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        String content = new String(message.getPayload());
        if(Objects.nonNull(mqttWebSocketHandler)){
            mqttWebSocketHandler.sendMessageToClients(content);
        }
    };
    
    @Override
    public void deliveryComplete(IMqttDeliveryToken token){}

}
