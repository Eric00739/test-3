"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Phone, Mail, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  id: string
  text: string
  sender: "user" | "support"
  timestamp: Date
}

export function InstantCommunication() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! Welcome to FastFunRC. How can I help you today?",
      sender: "support",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate support response
    setTimeout(() => {
      const supportResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message! One of our experts will be with you shortly. For immediate assistance, you can also call us at +86 158 9964 8898.",
        sender: "support",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, supportResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello, I'm interested in learning more about FastFunRC's solutions.")
    window.open(`https://wa.me/8615899648898?text=${message}`, "_blank")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Floating Communication Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        {/* WhatsApp Button */}
        <button
          onClick={openWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Contact on WhatsApp"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </button>

        {/* Chat Button */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2"
          aria-label="Start chat"
        >
          <MessageCircle size={24} />
          <span className="hidden sm:inline-block font-medium">Live Chat</span>
        </button>
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-2xl flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <div className="font-semibold">Support Team</div>
                <div className="text-xs opacity-90 flex items-center gap-1">
                  <CheckCircle size={10} />
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="border-b border-gray-200 p-3 bg-gray-50">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-xs flex-1"
                onClick={() => setInputMessage("I need technical support")}
              >
                Tech Support
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs flex-1"
                onClick={() => setInputMessage("I want to request a quote")}
              >
                Get Quote
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs flex-1"
                onClick={() => setInputMessage("I need product information")}
              >
                Product Info
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-orange-100" : "text-gray-500"}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-3">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-orange-500 hover:bg-orange-600"
                size="sm"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Contact Options (shown when chat is closed) */}
      {!isChatOpen && (
        <div className="fixed bottom-24 right-6 z-30 hidden lg:block">
          <div className="bg-white rounded-lg shadow-lg p-4 space-y-3 min-w-[200px]">
            <div className="text-sm font-medium text-gray-700 mb-2">Quick Contact</div>
            <a
              href="tel:+8615899648898"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 transition-colors"
            >
              <Phone size={16} />
              <span>+86 158 9964 8898</span>
            </a>
            <a
              href="mailto:eric@fastfunrc.com"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 transition-colors"
            >
              <Mail size={16} />
              <span>eric@fastfunrc.com</span>
            </a>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} />
              <span>Mon-Fri 9:00-18:00</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}