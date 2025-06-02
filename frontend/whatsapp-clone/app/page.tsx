"use client"

import { useState } from "react"
import ChatList from "@/components/chat-list"
import ChatWindow from "@/components/chat-window"

// Mock data for users and messages
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey, how are you doing?",
    timestamp: "2:30 PM",
    unread: 2,
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the help!",
    timestamp: "1:15 PM",
    unread: 0,
  },
  {
    id: 3,
    name: "Carol Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "See you tomorrow",
    timestamp: "12:45 PM",
    unread: 1,
  },
  {
    id: 4,
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Great job on the project!",
    timestamp: "11:30 AM",
    unread: 0,
  },
  {
    id: 5,
    name: "Emma Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Let me know when you're free",
    timestamp: "Yesterday",
    unread: 3,
  },
]

const initialMessages = {
  1: [
    { id: 1, text: "Hey there! How are you doing?", sender: "other", timestamp: "2:25 PM" },
    { id: 2, text: "I'm doing great, thanks for asking!", sender: "me", timestamp: "2:26 PM" },
    { id: 3, text: "That's wonderful to hear!", sender: "other", timestamp: "2:27 PM" },
    { id: 4, text: "How about you? How's your day going?", sender: "other", timestamp: "2:30 PM" },
  ],
  2: [
    { id: 1, text: "Thanks for helping me with the project!", sender: "other", timestamp: "1:10 PM" },
    { id: 2, text: "No problem at all, happy to help!", sender: "me", timestamp: "1:12 PM" },
    { id: 3, text: "You really saved the day", sender: "other", timestamp: "1:15 PM" },
  ],
  3: [
    { id: 1, text: "Don't forget about our meeting tomorrow", sender: "other", timestamp: "12:40 PM" },
    { id: 2, text: "I'll be there at 10 AM sharp", sender: "me", timestamp: "12:42 PM" },
    { id: 3, text: "Perfect! See you then", sender: "other", timestamp: "12:45 PM" },
  ],
  4: [
    { id: 1, text: "The presentation went really well!", sender: "me", timestamp: "11:25 AM" },
    { id: 2, text: "Great job on the project! Everyone was impressed", sender: "other", timestamp: "11:30 AM" },
  ],
  5: [
    { id: 1, text: "Are you free this weekend?", sender: "other", timestamp: "Yesterday" },
    { id: 2, text: "We should catch up over coffee", sender: "other", timestamp: "Yesterday" },
    { id: 3, text: "Let me know when you're free", sender: "other", timestamp: "Yesterday" },
  ],
}

export default function WhatsAppClone() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState(initialMessages)

  const handleUserSelect = (user) => {
    setSelectedUser(user)
  }

  const handleSendMessage = (messageText) => {
    if (!selectedUser || !messageText.trim()) return

    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
    }))
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat List Panel */}
      <div className="w-1/3 bg-white border-r border-gray-200">
        <ChatList users={users} onUserSelect={handleUserSelect} selectedUserId={selectedUser?.id} />
      </div>

      {/* Chat Window Panel */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <ChatWindow
            user={selectedUser}
            messages={messages[selectedUser.id] || []}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-8 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-light text-gray-600 mb-2">WhatsApp Web</h2>
              <p className="text-gray-500">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
