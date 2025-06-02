// src/ChatRoom.js
import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const stompClient = useRef(null);

  // Connect to WebSocket on mount
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws"); // Spring endpoint
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Connected ✅");
        stompClient.current.subscribe("/topic/messages", (msg) => {
          const message = JSON.parse(msg.body);
          setMessages((prev) => [...prev, message]);
        });
      },
      onStompError: (err) => {
        console.error("WebSocket error:", err);
      },
    });

    stompClient.current.activate();

    // Cleanup on unmount
    return () => {
      if (stompClient.current) stompClient.current.deactivate();
    };
  }, []);

  const sendMessage = () => {
    if (stompClient.current && stompClient.current.connected) {
      const chatMessage = {
        sender: "Arpith",
        content: input,
        timestamp: "", // Will be filled by server
      };

      stompClient.current.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(chatMessage),
      });

      setInput(""); // Clear input
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>💬 Real-Time Chat</h2>
      <div style={{ maxHeight: "300px", overflowY: "scroll", border: "1px solid gray", padding: "10px" }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.sender}</strong>: {msg.content} <small>({msg.timestamp})</small>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message..."
        style={{ width: "70%", marginTop: "10px" }}
      />
      <button onClick={sendMessage} style={{ marginLeft: "10px" }}>
        Send
      </button>
    </div>
  );
};

export default ChatRoom;
