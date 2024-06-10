package com.psd.RealTimeSensorDataAnalyticsBackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.psd.RealTimeSensorDataAnalyticsBackend.constants.UserEnum;
import com.psd.RealTimeSensorDataAnalyticsBackend.models.TopicsModel;
import com.psd.RealTimeSensorDataAnalyticsBackend.models.Users;
import com.psd.RealTimeSensorDataAnalyticsBackend.models.UsersMachineModel;
import com.psd.RealTimeSensorDataAnalyticsBackend.repository.TopicRepository;
import com.psd.RealTimeSensorDataAnalyticsBackend.repository.UserRepository;
import com.psd.RealTimeSensorDataAnalyticsBackend.repository.UsersMachineRepository;
import com.psd.RealTimeSensorDataAnalyticsBackend.utils.JwtTokenUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping
public class UsersMachineController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private UsersMachineRepository usersMachineRepository;

    @PostMapping(value = "/assign-machine-to-user")
    public ResponseEntity<Object> assignMachineToUser(@RequestHeader(value = "Authorization", required = false) String token,
                                    @RequestBody UsersMachineModel usersMachineModel){

        Map<String, String> resultResponse = new HashMap<>();
        if (token == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token Is required to Proceed");
        }else{
            System.out.println("TOKEN IS --> "+token);
            String realToken = token.substring(7);
            boolean tokenCheckResult = jwtTokenUtil.validateToken(realToken);
            if(tokenCheckResult){
                String username = jwtTokenUtil.getUsernameFromToken(realToken);
                Users adminUser = userRepository.findByUsername(username);
                if(adminUser.getUserType().equals(UserEnum.IS_ADMIN.toString())){
                    // check if the user given username exists in the database
                    String adminGivenUserName = usersMachineModel.getUsername();
                    Users user = userRepository.findByUsername(adminGivenUserName);
                    if(Objects.nonNull(user)){
                        // user name is found in database
                        // now check the machine exisits or not
                        TopicsModel machineFoundResults = topicRepository.findByMachineName(usersMachineModel.getMachineName());
                        if (Objects.nonNull(machineFoundResults)){
                            usersMachineModel.setUserId(user.getId());
                            usersMachineModel.setMachineId(machineFoundResults.getId());
                            usersMachineModel.setUsername(user.getUsername());
                            usersMachineModel.setMachineName(machineFoundResults.getMachineName());
                            if(usersMachineRepository.save(usersMachineModel).getId()>0){
                                resultResponse.put("message", "Assignment completed!");
                                return  ResponseEntity.status(HttpStatus.OK).body(resultResponse); 
                            } else {
                                resultResponse.put("message", "Machine Not assigned due to internal server error");
                                return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resultResponse); 
                            }
                        } else {
                            resultResponse.put("message", "Machine Name not found in database "+usersMachineModel.getMachineName() + ", Please register this machine before proceeding");
                            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultResponse); 
                        }
                    } else {
                        // user name not found in database
                        resultResponse.put("message", "userName not found in database "+adminGivenUserName + ", Please register this user before proceeding");
                        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultResponse); 
                    }
                } else {
                    resultResponse.put("message", "As you are not admin you are not allowed to assign machine to user");
                    return  ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(resultResponse);   
                }
            } else {
                resultResponse.put("message", "Unautorized due to: " + tokenCheckResult);
                return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resultResponse);
            }
        }
    }


    
}
