'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../contexts/AuthContext';
import { generateWelcomeMessage } from '../../utils/welcomeMessages';
import { useRouter } from 'next/navigation';

// Get backend URL from environment or default to localhost
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

export default function ChatPage() {
  const { user, loading, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  // Initialize welcome message based on user authentication status
  useEffect(() => {
    if (!loading) {
      generateWelcomeMessage(user, true).then(welcomeMessage => {
        setMessages([{
          role: 'assistant',
          content: welcomeMessage,
          timestamp: new Date()
        }]);
      });
    }
  }, [user, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);



  useEffect(() => {
    // Keep a global flag for navbar to check login state
    window.__supeai_user_logged_in = !!user;
  }, [user]);

  // Listen for custom logout modal event from navbar
  useEffect(() => {
    const handler = (e) => {
      if (e.detail && e.detail.href) {
        // setShowLogoutModal(true); // Removed
        // setPendingNavigation(e.detail.href); // Removed
        // setBlockNavigation(true); // Removed
      }
    };
    window.addEventListener('supeai-logout-modal', handler);
    return () => window.removeEventListener('supeai-logout-modal', handler);
  }, []);

  // Intercept browser back/forward navigation
  useEffect(() => {
    if (!user) return;
    const onPopState = (e) => {
      if (window.location.pathname !== '/chat') {
        // setShowLogoutModal(true); // Removed
        // setPendingNavigation(window.location.pathname); // Removed
        // setBlockNavigation(true); // Removed
        window.history.pushState(null, '', '/chat'); // Stay on chat until user confirms
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [user]); // Removed blockNavigation from dependency array

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    // Add user message to chat
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      // Fetch response from API
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Simulate typing delay
      setTimeout(() => {
        // Add assistant response to chat
        const assistantMessage = {
          role: 'assistant',
          content: data.reply,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
        setIsTyping(false);
      }, 1000);

    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    // Use consistent 24-hour format to avoid AM/PM locale issues
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login');
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication or redirecting
  if (loading || (!user && typeof window !== 'undefined')) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-[#051A05] via-[#0A2A0A] to-[#051A05] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white text-xl"
          >
            Loading...
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={`min-h-screen bg-gradient-to-br from-[#051A05] via-[#0A2A0A] to-[#051A05] transition-all duration-300`}>
        {/* Chat Container */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl min-h-[600px] flex flex-col">

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                            ? 'bg-gradient-to-r from-[#00FFC2] to-[#00FFC2]/80'
                            : 'bg-gradient-to-r from-purple-500 to-blue-500'
                          }`}>
                          {message.role === 'user' ? (
                            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          )}
                        </div>

                        {/* Message Content */}
                        <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                          <div className={`inline-block p-4 rounded-2xl ${message.role === 'user'
                              ? 'bg-gradient-to-r from-[#00FFC2] to-[#00FFC2]/90 text-black shadow-lg'
                              : 'bg-white/10 text-white backdrop-blur-sm border border-white/10'
                            }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          </div>
                          <div className={`text-xs text-gray-400 mt-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="bg-white/10 text-white p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-white rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                        ></motion.div>
                        <motion.div
                          className="w-2 h-2 bg-white rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                        ></motion.div>
                        <motion.div
                          className="w-2 h-2 bg-white rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-6">
              <div className="flex items-end space-x-4">
                <motion.div
                  className="flex-1 relative"
                  whileFocus={{ scale: 1.02 }}
                >
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={user ? `Message Supe AI, ${user.name || user.displayName || 'User'}...` : "Message Supe AI..."}
                    disabled={isLoading}
                    rows={1}
                    className="w-full p-4 bg-white/10 text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FFC2]/50 focus:bg-white/15 transition-all duration-300 disabled:opacity-50 backdrop-blur-sm border border-white/10 resize-none"
                    style={{ minHeight: '60px', maxHeight: '200px' }}
                  />
                </motion.div>

                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 25px rgba(0, 255, 194, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#00FFC2] to-[#00FFC2]/90 text-black p-4 rounded-2xl hover:from-[#00FFC2]/90 hover:to-[#00FFC2] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ rotate: 15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </motion.svg>
                </motion.button>
              </div>

              <div className="text-xs text-gray-400 mt-3 text-center">
                Press Enter to send, Shift+Enter for new line
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 