
package com.chatapp.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Enable a WebSocket endpoint at /ws, so the React frontend can connect to it.
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Enable simple broker for topic-based messaging
        registry.enableSimpleBroker("/topic"); // "/topic" is where messages are broadcasted.

        // Set application destination prefix
        registry.setApplicationDestinationPrefixes("/app");  // /app/** is where messages are received from the frontend."
    }
}
