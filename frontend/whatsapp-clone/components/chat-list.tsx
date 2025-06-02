"use client"

import { Search } from "lucide-react"
import ChatItem from "./chat-item"

interface User {
  id: number
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
}

interface ChatListProps {
  users: User[]
  onUserSelect: (user: User) => void
  selectedUserId?: number
}

export default function ChatList({ users, onUserSelect, selectedUserId }: ChatListProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gray-100 p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">Chats</h1>
      </div>

      {/* Search Bar */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none outline-none text-sm"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <ChatItem
            key={user.id}
            user={user}
            isSelected={selectedUserId === user.id}
            onClick={() => onUserSelect(user)}
          />
        ))}
      </div>
    </div>
  )
}
