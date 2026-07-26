import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import joy1 from '../assets/joy1.png';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: "Hi! I'm Joydeep's portfolio assistant powered by Gemini AI. Ask me anything about his skills, projects, certifications, or experience!" 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef(null);

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // Portfolio context for better responses
  const portfolioContext = `You are Joydeep's portfolio assistant. Here's information about Joydeep:

  ABOUT JOYDEEP:
  - B.Tech student specializing in AI/ML, cybersecurity, and full-stack development
  - Email: joydeep102004@gmail.com
  - Passionate about cutting-edge technology and building user-friendly applications

  TECHNICAL SKILLS:
  - Core: Python, C, JavaScript, SQL, Unix/Linux
  - Web Development: HTML, CSS, React, Tailwind CSS, Node.js
  - AI/ML: Python, NumPy, Pandas, scikit-learn, TensorFlow, OpenCV
  - Databases: MySQL, MongoDB, SQLite, PostgreSQL
  - DevOps: Git, GitHub, Docker, CI/CD, AWS (Basics), Vercel/Netlify
  - Other: Data Structures & Algorithms, OOP, REST APIs, Socket Programming, Cybersecurity, NLP/CV

  CERTIFICATIONS (2025):
  1. Intro to Data Science (Infosys)
  2. Introduction to RPA (Infosys)
  3. Introduction to Deep Learning (Infosys)
  4. Getting Started with AI (IBM)
  5. Introduction to NLP (Infosys)
  6. Computer Vision 101 (Infosys)

  PROJECTS:
  - Portfolio website (React, Tailwind CSS, Framer Motion)
  - Chat Application (Real-time with Socket.io)
  - Currency Converter (Live exchange rates)
  - Drowsiness Detection (AI-powered with computer vision)
  - Neural Network Visualizer (Interactive ML tool)
  - Resume Builder (Dynamic with multiple templates)

  Always respond as Joydeep's helpful assistant. Be conversational, informative, and encourage visitors to explore his portfolio or contact him for collaboration.`;

  // Quick suggestion buttons
  const quickSuggestions = [
    "What are Joydeep's main technical skills?",
    "Tell me about his AI/ML certifications",
    "What projects has he worked on?",
    "How can I contact him for collaboration?",
    "What makes him unique as a developer?"
  ];

  // Generate AI response using Gemini
  const generateAIResponse = async (userMessage) => {
    try {
      const prompt = `${portfolioContext}\n\nUser question: ${userMessage}\n\nPlease provide a helpful, conversational response about Joydeep's portfolio:`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini AI error:', error);
      return "I apologize, but I'm having trouble connecting to my AI service right now. Please feel free to explore Joydeep's portfolio directly or contact him at joydeep102004@gmail.com for any specific questions!";
    }
  };

  // Send conversation to backend
  const saveConversation = async (userMessage, botResponse) => {
    try {
      const API_BASE = process.env.REACT_APP_API_URL || '';
      
      await fetch(`${API_BASE}/api/chatbot/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          userMessage,
          botResponse,
          timestamp: new Date().toISOString(),
        }),
      });
      
      console.log('[Chatbot] Conversation saved to backend');
    } catch (error) {
      console.error('[Chatbot] Failed to save conversation:', error);
      // Don't show error to user - this is background logging
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Generate AI response using Gemini
      const response = await generateAIResponse(currentInput);
      const botMessage = { type: 'bot', text: response };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Save conversation to backend (don't wait for completion)
      saveConversation(currentInput, response);
      
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = { 
        type: 'bot', 
        text: "I apologize, but I'm experiencing some technical difficulties. Please feel free to explore Joydeep's portfolio or contact him directly at joydeep102004@gmail.com!" 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 left-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg z-50 hover:shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
          className="w-10 h-10 flex items-center justify-center"
        >
          {isOpen ? (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
            </svg>
          ) : (
            <img 
              src={joy1} 
              alt="Joydeep" 
              className="w-10 h-10 rounded-full object-cover border-2 border-white/30 shadow-lg"
            />
          )}
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-32 left-8 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center p-1">
                  <img 
                    src={joy1} 
                    alt="Joydeep" 
                    className="w-full h-full rounded-full object-cover border border-white/30"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Portfolio Assistant</h3>
                  <p className="text-xs opacity-90">Ask me about Joydeep's skills & projects</p>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {message.text.split('\n').map((line, i) => (
                      <div key={i} className={i > 0 ? 'mt-2' : ''}>{line}</div>
                    ))}
                  </div>
                </motion.div>
              ))}
              
              {/* Quick Suggestions (only show initially) */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Quick questions:</p>
                  {quickSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left text-xs p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      💡 {suggestion}
                    </motion.button>
                  ))}
                </motion.div>
              )}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex space-x-1">
                      <motion.div 
                        className="w-2 h-2 bg-blue-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-blue-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-blue-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
                  placeholder="Ask about Joydeep's skills, projects..."
                  disabled={isTyping}
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={isTyping || !inputValue.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isTyping ? '⏳' : '🚀'}
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Interactive Portfolio Assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
