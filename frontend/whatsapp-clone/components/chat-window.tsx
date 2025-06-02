import { MoreVertical, Phone, Video } from "lucide-react"
import Message from "./message"
import MessageInput from "./message-input"

interface User {
  id: number
  name: string
  avatar: string
}

interface MessageType {
  id: number
  text: string
  sender: "me" | "other"
  timestamp: string
}

interface ChatWindowProps {
  user: User
  messages: MessageType[]
  onSendMessage: (message: string) => void
}

export default function ChatWindow({ user, messages, onSendMessage }: ChatWindowProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-gray-100 p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h2 className="font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  )
}
