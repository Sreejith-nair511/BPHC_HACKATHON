"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input as InputComponent } from "@/components/ui/input"
import { Mic, Send, User, Bot, MicOff } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export function ChatbotAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your healthcare assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate assistant response after a short delay
    setTimeout(() => {
      const assistantResponse = getAssistantResponse(input)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: assistantResponse,
        sender: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)

    // If starting recording, simulate voice input after a delay
    if (!isRecording) {
      setTimeout(() => {
        setInput("I've been having headaches for the past few days.")
        setIsRecording(false)
      }, 3000)
    }
  }

  const getAssistantResponse = (userInput: string) => {
    const input = userInput.toLowerCase()

    if (input.includes("headache") || input.includes("head") || input.includes("pain")) {
      return "I'm sorry to hear about your headaches. How long have you been experiencing them? Are they accompanied by any other symptoms like nausea, sensitivity to light, or blurred vision?"
    }

    if (input.includes("appointment") || input.includes("schedule") || input.includes("book")) {
      return "I can help you schedule an appointment. Dr. Johnson has availability tomorrow at 10:00 AM and 2:30 PM. Would either of those times work for you?"
    }

    if (input.includes("medication") || input.includes("medicine") || input.includes("prescription")) {
      return "Your current medications include Lisinopril (10mg, once daily) and Atorvastatin (20mg, once daily). Your next refill is scheduled for March 30. Would you like me to request an early refill?"
    }

    if (input.includes("result") || input.includes("test") || input.includes("lab")) {
      return "Your recent lab results show normal values for most indicators. Your cholesterol is slightly elevated at 210 mg/dL (target: <200 mg/dL). Would you like me to schedule a follow-up with your doctor to discuss this?"
    }

    return "I understand. Can you provide more details about your symptoms so I can better assist you?"
  }

  return (
    <Card className="flex h-[500px] w-full flex-col">
      <CardHeader>
        <CardTitle>Healthcare Assistant</CardTitle>
        <CardDescription>Ask questions about your health, symptoms, or schedule appointments</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start gap-2 max-w-[80%]">
                {message.sender === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="mt-1 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form
          className="flex w-full items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
        >
          <Button
            type="button"
            size="icon"
            variant={isRecording ? "destructive" : "outline"}
            onClick={toggleRecording}
            className="shrink-0"
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <InputComponent
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

