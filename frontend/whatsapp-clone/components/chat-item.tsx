"use client"

interface User {
  id: number
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
}

interface ChatItemProps {
  user: User
  isSelected: boolean
  onClick: () => void
}

export default function ChatItem({ user, isSelected, onClick }: ChatItemProps) {
  return (
    <div
      className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
        isSelected ? "bg-gray-100" : ""
      }`}
      onClick={onClick}
    >
      {/* Avatar */}
      <div className="relative">
        <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
      </div>

      {/* Chat Info */}
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
          <span className="text-xs text-gray-500 ml-2">{user.timestamp}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
          {user.unread > 0 && (
            <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 ml-2 min-w-[20px] text-center">
              {user.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
