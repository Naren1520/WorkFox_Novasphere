import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your WorkFox AI assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error('Please set your Gemini API key in the .env file');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const context = `You are a helpful AI assistant for WorkFox, a decentralized freelance platform built on Algorand blockchain. 
      Help users with questions about:
      - How to use the platform (creating tasks, claiming tasks, submitting work)
      - Blockchain and Algorand technology
      - Smart contracts and payments
      - General freelancing questions
      
      Keep responses concise, friendly, and helpful.`;

      const prompt = `${context}\n\nUser question: ${currentInput}`;
      
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      const assistantMessage: Message = {
        role: 'assistant',
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please make sure your API key is configured correctly in the .env file.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 group"
          style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bb86fc 100%)', boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.1)' }}
        >
          <img
            src="/images/logo.png"
            alt="AI Assistant"
            className="w-10 h-10 rounded-full object-contain"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00d4ff] rounded-full border-2 border-white animate-pulse"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] rounded-2xl shadow-2xl flex flex-col z-50 animate-slide-up" style={{ background: 'linear-gradient(135deg, rgba(22, 33, 62, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)', backdropFilter: 'blur(10px)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          {/* Header */}
          <div className="text-white p-4 rounded-t-2xl flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #2d1b69 0%, #1a0033 100%)', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <div className="flex items-center space-x-3">
              <img
                src="/images/logo.png"
                alt="AI Assistant"
                className="w-10 h-10 rounded-full object-contain bg-[#d4af37] p-1"
              />
              <div>
                <h3 className="font-semibold" style={{ color: '#d4af37' }}>WorkFox AI</h3>
                <p className="text-xs" style={{ color: '#b0b0b8' }}>Powered by Gemini</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 rounded-lg p-2 transition-colors"
              style={{ color: '#d4af37' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{ background: 'linear-gradient(135deg, rgba(15, 15, 30, 0.5) 0%, rgba(26, 26, 46, 0.5) 100%)' }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[80%] rounded-2xl px-4 py-2"
                  style={
                    message.role === 'user'
                      ? { background: 'linear-gradient(135deg, #d4af37 0%, #bb86fc 100%)', color: '#0f0f1e' }
                      : { background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.2)', color: '#b0b0b8' }
                  }
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p
                    className="text-xs mt-1"
                    style={
                      message.role === 'user'
                        ? { color: 'rgba(15, 15, 30, 0.7)' }
                        : { color: 'rgba(176, 176, 184, 0.6)' }
                    }
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.2)' }} className="rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#d4af37' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#d4af37', animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#d4af37', animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 rounded-b-2xl" style={{ background: 'linear-gradient(135deg, rgba(22, 33, 62, 0.8) 0%, rgba(26, 26, 46, 0.8) 100%)', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 rounded-xl focus:outline-none transition-all disabled:opacity-50"
                style={{ background: 'rgba(15, 15, 30, 0.6)', color: '#b0b0b8', border: '1px solid rgba(212, 175, 55, 0.2)' }}
                onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.3)'}
                onBlur={(e) => e.currentTarget.style.boxShadow = 'none'}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bb86fc 100%)', color: '#0f0f1e' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
