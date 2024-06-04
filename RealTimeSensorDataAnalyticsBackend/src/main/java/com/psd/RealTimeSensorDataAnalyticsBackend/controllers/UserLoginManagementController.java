package com.psd.RealTimeSensorDataAnalyticsBackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import com.psd.RealTimeSensorDataAnalyticsBackend.models.Users;
import com.psd.RealTimeSensorDataAnalyticsBackend.models.TokenModel;
import com.psd.RealTimeSensorDataAnalyticsBackend.repository.UserRepository;
import com.psd.RealTimeSensorDataAnalyticsBackend.utils.JwtTokenUtil;

@Controller
@RequestMapping
public class UserLoginManagementController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody Users user){
        String hashedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        
        if (userRepository.save(user).getId()>0){
            return ResponseEntity.ok("User Registered Succesfully");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User Not Saved, Internal Server Error. Please Try Again");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<Object> generateToken(@RequestBody TokenModel tokenReqRes){
        Users databaseUser = userRepository.findByUsername(tokenReqRes.getUsername());
        if (databaseUser == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sorry, User Does Not Exist");
        }
        if (new BCryptPasswordEncoder().matches(tokenReqRes.getPassword(), databaseUser.getPassword())){
            String token = jwtTokenUtil.generateToken(tokenReqRes.getUsername());
            tokenReqRes.setToken(token);
            tokenReqRes.setExpirationTime("60 Min");
            Map<String, String> resultResponse = new HashMap<>();
            resultResponse.put("username", tokenReqRes.getUsername());
            resultResponse.put("expiryTime", tokenReqRes.getExpirationTime());
            resultResponse.put("token", tokenReqRes.getToken());
            return ResponseEntity.ok(resultResponse);
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password Doesn't Match. Verify");
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/validate-token")
    public ResponseEntity<Object> validateToken(@RequestBody TokenModel tokenReqRes){
        return ResponseEntity.ok(jwtTokenUtil.validateToken(tokenReqRes.getToken()));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/test-login")
    public  ResponseEntity<Object> getAllFruits(@RequestHeader(value = "Authorization", required = false) String token){
        if (token == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token Is required to Proceed");
        }else{
            System.out.println("TOKEN IS --> "+token);
            String realToken = token.substring(7);
            String tokenCheckResult = jwtTokenUtil.validateToken(realToken);
            if (tokenCheckResult.equalsIgnoreCase("valid")){
                List<String> fruits = List.of("Mango", "Banana", "Orange","Watermellon","Grapes", "Appple", "Berries");
                return new ResponseEntity<>(fruits, HttpStatus.OK);
            }else{
                return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unautorixed dur to: " + tokenCheckResult);
            }
        }
    }


}