package com.psd.RealTimeSensorDataAnalyticsBackend.configurations;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;


@Component
public class MqttBrokerCallBacksAutoBeans implements MqttCallback {


    @Autowired
    private SimpMessagingTemplate messagingTemplate;

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
    public void messageArrived(String topic, MqttMessage message) throws Exception{
        String content = new String(message.getPayload());
        messagingTemplate.convertAndSend("/topic/messages", content);
    }
    
    @Override
    public void deliveryComplete(IMqttDeliveryToken token){}

}
