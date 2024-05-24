package com.psd.RealTimeSensorDataAnalyticsBackend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class EmployeeController {

    @GetMapping("/all")
    public Map<String, String> getAllEmployee(){
        Map<String, String> result = new HashMap<>();
        result.put("message", "Hello, world!");
        return result;
    }

    @GetMapping("/welcome")
    public String welcomeMessage(){
        return "Welcome to My API";
    }
}
