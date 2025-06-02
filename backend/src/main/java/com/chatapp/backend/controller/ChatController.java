package com.chatapp.backend.controller;

import com.chatapp.backend.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
public class ChatController {

    @MessageMapping("/chat.send")  //handle messages sent to /app/chat.send
    @SendTo("/topic/messages")  
    public ChatMessage sendMessage(ChatMessage message) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        message.setTimestamp(timestamp);
        return message;
    }
}
