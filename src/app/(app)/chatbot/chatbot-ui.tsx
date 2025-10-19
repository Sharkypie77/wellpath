"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, User, Bot } from "lucide-react";
import { chat } from "@/ai/flows/chatbot";
import type { ChatbotMessage } from "@/lib/types";


export function ChatbotUI() {
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatbotMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage];
      const { response } = await chat({ history: chatHistory, prompt: input });
      const botMessage: ChatbotMessage = { role: "model", content: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting response from AI:", error);
      const errorMessage: ChatbotMessage = {
        role: "model",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-4 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}>
            {msg.role === "model" && (
              <div className="p-2 bg-primary rounded-full text-primary-foreground">
                <Bot size={20} />
              </div>
            )}
            <div className={`rounded-lg p-3 max-w-[80%] ${
                msg.role === "user"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}>
              <p className="text-sm">{msg.content}</p>
            </div>
            {msg.role === "user" && (
              <div className="p-2 bg-accent rounded-full text-accent-foreground">
                <User size={20} />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4 justify-start">
             <div className="p-2 bg-primary rounded-full text-primary-foreground">
                <Bot size={20} />
              </div>
            <div className="rounded-lg p-3 bg-muted">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </form>
      </div>
    </div>
  );
}
