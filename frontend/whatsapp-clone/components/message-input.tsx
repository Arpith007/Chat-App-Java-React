"use client"

import type React from "react"

import { useState } from "react"
import { Send, Paperclip, Mic, Smile } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (message: string) => void
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="bg-gray-100 p-4 border-t border-gray-200">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <button type="button" className="p-2 hover:bg-gray-200 rounded-full">
          <Paperclip className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="w-full px-4 py-2 pr-12 bg-white rounded-full border border-gray-300 outline-none focus:border-green-500"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full"
          >
            <Smile className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {message.trim() ? (
          <button type="submit" className="p-2 bg-green-500 hover:bg-green-600 rounded-full">
            <Send className="w-5 h-5 text-white" />
          </button>
        ) : (
          <button type="button" className="p-2 hover:bg-gray-200 rounded-full">
            <Mic className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </form>
    </div>
  )
}
