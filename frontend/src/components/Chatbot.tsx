'use client';

import React, { useState, useRef, useEffect, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { generateWelcomeMessage } from '../utils/welcomeMessages';

// Backend URL configuration
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

// Type definitions
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  reply: string;
  model?: string;
  usage?: any;
}

export default function Chatbot(): JSX.Element {
  // Authentication
  const { user } = useAuth() as { user: any };
  
  // State management
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message based on user authentication status
  useEffect(() => {
    generateWelcomeMessage(user, false).then(welcomeMessage => {
      setMessages([{
        role: 'assistant',
        content: welcomeMessage
      }]);
    });
  }, [user]);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data: ChatResponse = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.' 
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Network error. Please check your connection and try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputMessage(e.target.value);
  };

  // Handle modal close
  const handleCloseModal = (): void => {
    setIsOpen(false);
  };

  // Handle modal backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#00FFC2] to-[#00FFC2]/90 text-black rounded-full shadow-2xl hover:from-[#00FFC2]/90 hover:to-[#00FFC2] transition-all duration-300 z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open chat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl h-[600px] bg-gradient-to-br from-[#051A05] to-[#0A2A0A] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-black/30 backdrop-blur-md border-b border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#00FFC2] to-[#00FFC2]/80 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Supe AI Assistant</h3>
                      <p className="text-gray-400 text-sm">
                        {user ? `Welcome, ${user.name || user.displayName || 'User'}!` : 'Ask me about our services'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Close chat"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-[#00FFC2] to-[#00FFC2]/90 text-black'
                          : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Loading Indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 backdrop-blur-md text-white border border-white/20 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-[#00FFC2] rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-[#00FFC2] rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-[#00FFC2] rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={handleInputChange}
                    placeholder={user ? `Ask me anything, ${user.name || user.displayName || 'User'}...` : "Ask about our services..."}
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FFC2] focus:border-transparent"
                    disabled={isLoading}
                  />
                  <motion.button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-[#00FFC2] to-[#00FFC2]/90 text-black font-semibold rounded-lg hover:from-[#00FFC2]/90 hover:to-[#00FFC2] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 