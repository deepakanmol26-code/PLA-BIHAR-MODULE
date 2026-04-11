"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Phone, BookOpen, Heart, Gamepad2, AlertTriangle } from "lucide-react";
import { getChatResponse, type ChatResponse } from "@/data/chatKnowledge";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  isEmergency?: boolean;
  quickActions?: string[];
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: 0,
  text: `🙏 **नमस्ते! PLA स्वास्थ्य सहायक**

मैं सहरसा (बिहार) के लिए PLA स्वास्थ्य सहायक हूं।

आप मुझसे पूछ सकते हैं:
• PLA बैठकों की जानकारी
• स्वास्थ्य संबंधी सहायता
• आपातकालीन नंबर
• गतिविधियां और नियम

👇 नीचे कोई सवाल लिखें या बटन दबाएं!`,
  sender: "bot",
  quickActions: ["PLA क्या है?", "📞 हेल्पलाइन", "स्वास्थ्य सहायता", "बैठक 1"],
  timestamp: new Date(),
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: nextId.current++,
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate slight delay for natural feel
    setTimeout(() => {
      const response: ChatResponse = getChatResponse(text);
      const botMsg: Message = {
        id: nextId.current++,
        text: response.text,
        sender: "bot",
        isEmergency: response.isEmergency,
        quickActions: response.quickActions,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 400 + Math.random() * 300);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const quickActionButtons = [
    { icon: <Phone className="w-3.5 h-3.5" />, label: "📞 नंबर", action: "नंबर दो" },
    { icon: <BookOpen className="w-3.5 h-3.5" />, label: "PLA", action: "PLA क्या है?" },
    { icon: <Heart className="w-3.5 h-3.5" />, label: "स्वास्थ्य", action: "स्वास्थ्य सहायता" },
    { icon: <Gamepad2 className="w-3.5 h-3.5" />, label: "गतिविधि", action: "गतिविधियां" },
  ];

  // Format bold text (**text**) into spans
  const formatText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-green-600 text-white shadow-2xl flex items-center justify-center hover:shadow-orange-500/30 transition-shadow"
            aria-label="Open PLA Health Assistant chat"
          >
            <MessageCircle className="w-6 h-6" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-green-600 px-4 py-3 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
                  🏥
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight">PLA स्वास्थ्य सहायक</p>
                  <p className="text-[11px] opacity-80">सहरसा, बिहार • 24/7 उपलब्ध</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Action Strip */}
            <div className="flex gap-1.5 px-3 py-2 bg-gray-50 border-b shrink-0 overflow-x-auto">
              {quickActionButtons.map((btn) => (
                <button
                  key={btn.label}
                  onClick={() => sendMessage(btn.action)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all whitespace-nowrap shrink-0"
                >
                  {btn.icon}
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-gradient-to-b from-gray-50/50 to-white">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-br-md"
                        : msg.isEmergency
                        ? "bg-red-50 border-2 border-red-300 text-red-900 rounded-bl-md"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"
                    }`}
                  >
                    {msg.isEmergency && (
                      <div className="flex items-center gap-1.5 mb-2 text-red-600 font-bold text-xs">
                        <AlertTriangle className="w-4 h-4" />
                        आपातकालीन
                      </div>
                    )}
                    <div>{formatText(msg.text)}</div>

                    {/* Quick action buttons inside message */}
                    {msg.quickActions && msg.quickActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2.5 border-t border-gray-100">
                        {msg.quickActions.map((action) => (
                          <button
                            key={action}
                            onClick={() => sendMessage(action)}
                            className="px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-medium hover:bg-orange-100 transition-colors border border-orange-200"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-3 py-3 border-t bg-white flex gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="अपना सवाल यहां लिखें..."
                className="flex-1 px-4 py-2.5 rounded-full bg-gray-100 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white border border-transparent focus:border-orange-300 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-green-600 text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Emergency footer */}
            <div className="px-3 py-1.5 bg-red-50 text-center border-t border-red-100 shrink-0">
              <p className="text-[10px] text-red-600 font-medium">
                🚨 आपातकाल? तुरंत <a href="tel:108" className="underline font-bold">108</a> पर कॉल करें
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
