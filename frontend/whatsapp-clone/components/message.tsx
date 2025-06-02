interface MessageType {
  id: number
  text: string
  sender: "me" | "other"
  timestamp: string
}

interface MessageProps {
  message: MessageType
}

export default function Message({ message }: MessageProps) {
  const isMe = message.sender === "me"

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isMe ? "bg-green-500 text-white" : "bg-white text-gray-800 border border-gray-200"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <p className={`text-xs mt-1 ${isMe ? "text-green-100" : "text-gray-500"}`}>{message.timestamp}</p>
      </div>
    </div>
  )
}
